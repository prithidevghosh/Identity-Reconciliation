
import User from "../models/user.model";
import { Op } from "sequelize";
import { Request, Response } from 'express';
import { generateRandomFourDigitNumber, validateInput } from "../utils";


interface BaseContact {
    contact: {
        primaryContactId: number | null;
        emails: (string | null)[] | null;
        phoneNumbers: (number | null)[] | null;
        secondaryContactIds: number[] | null;
    };
}

const addUser = async (req: Request, res: Response) => {

    const email: string | null = req.body?.email || null;
    const phoneNumber: number | null = req.body?.phoneNumber || null;

    if (!validateInput(email, phoneNumber)){
        return res.status(422).json({
            error:422,
            type: "UNPROCESSABLE ENTITY",
            reason: "null value should not be stored"
        }) 
    }
    let baseContact: BaseContact;
    try {
       

        let user = await findUser(email, phoneNumber);

        if (user !== null && user !== undefined && user.length > 0) {
            // Users found

            if (user.length === 2 && user[0].dataValues.linkPrecedence === "Primary" && user[1].dataValues.linkPrecedence === "Primary") {
                // Update existing user linkPrecedence and construct baseContact
                await user[1].update({ linkPrecedence: "Secondary" });

                baseContact = {
                    contact: {
                        primaryContactId: user[0].dataValues.id,
                        emails: [user[0].dataValues.email, user[1].dataValues.email],
                        phoneNumbers: [user[0].dataValues.phoneNumber, user[1].dataValues.phoneNumber],
                        secondaryContactIds: [user[1].dataValues.id]
                    }
                };
            } else {
                let needToInsertData = true
                baseContact = {
                    contact: {
                        primaryContactId: user[0].dataValues.id,
                        emails: [],
                        phoneNumbers: [],
                        secondaryContactIds: []
                    }
                };

                let isEmailPresent = false, isPhoneNumberPresent = false, index = 0

                for (let singleUser of user) {
                    if (singleUser.dataValues.email === email) {
                        isEmailPresent = true;
                    }
                    if (singleUser.dataValues.phoneNumber === phoneNumber) {
                        isPhoneNumberPresent = true;
                    }

                    if (!baseContact.contact.emails?.includes(singleUser.dataValues.email)) {
                        baseContact.contact.emails?.push(singleUser.dataValues.email);
                    }

                    if (!baseContact.contact.phoneNumbers?.includes(singleUser.dataValues.phoneNumber)) {
                        baseContact.contact.phoneNumbers?.push(singleUser.dataValues.phoneNumber);
                    }

                    if (index != 0) {
                        baseContact.contact.secondaryContactIds?.push(singleUser.dataValues.id);
                    }
                    index+=1;
                }

                if (isEmailPresent && isPhoneNumberPresent) {
                    // No need to insert data
                    needToInsertData = false;
                }

                if (needToInsertData && email!== null && phoneNumber!== null) {
                    // Insert new user
                    const newUserId = generateRandomFourDigitNumber();
                    await User.create({
                        id: newUserId,
                        phoneNumber: phoneNumber,
                        email: email,
                        linkedId: user[0].dataValues.id,
                        linkPrecedence: "Secondary"
                    });

                    if (!baseContact.contact.emails?.includes(email)) {
                        baseContact.contact.emails?.push(email);
                    }

                    if (!baseContact.contact.phoneNumbers?.includes(phoneNumber)) {
                        baseContact.contact.phoneNumbers?.push(phoneNumber);
                    }

                    baseContact.contact.secondaryContactIds?.push(newUserId);
                }
            }

            return res.status(200).json(baseContact);
        } else {
            if (email !== null && phoneNumber !== null){
                console.log("type of phonenumber before insert", typeof phoneNumber);
                const newUserIdValue = generateRandomFourDigitNumber()
                await User.create({
                    id: newUserIdValue,
                    phoneNumber: phoneNumber,
                    email: email,
                    linkPrecedence: "Primary"
                });
                baseContact = {
                    contact: {
                        primaryContactId: newUserIdValue,
                        emails: [email],
                        phoneNumbers: [phoneNumber || null],
                        secondaryContactIds: []
                    }
                };
                return res.status(200).send(baseContact);
            }
            else{
                return res.status(422).json({
                    error:422,
                    type: "UNPROCESSABLE ENTITY",
                    reason: "null value should not be stored"
                })
            }
        }
    } catch (error) {
        console.error('Error adding user:', error);
        return res.status(500).send('Internal Server Error');
    }
};


function findUser(email:string|null, phoneNumber:number|null) {
    return findOldestUserByEmailOrNumber(email, phoneNumber)
        .then((oldestUser) => {
            if (oldestUser) {
                return oldestUser;
            } else {
                console.log('No matching user found.');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


async function findOldestUserByEmailOrNumber(email: string | null, phoneNumber: number | null): Promise<User[] | null> {
  try {
    const whereCondition: any = {};
    if (email !== null && phoneNumber !== null) {
      whereCondition[Op.or] = [{ email }, { phoneNumber }];
    } else if (email !== null) {
      whereCondition.email = email;
    } else {
      whereCondition.phoneNumber = phoneNumber;
    }

    const oldestUser = await User.findAll({
      where: whereCondition,
      order: [['createdAt', 'ASC']] // Order by createdAt in ascending order
    });

    console.log("old users", oldestUser);
    
    if (oldestUser.length > 0){
        return oldestUser;
    } else {
        console.log("No users found")
        return null;
    }
  } catch (error) {
    console.error('Error finding oldest user:', error);
    return null;
  }
}

export { addUser }
