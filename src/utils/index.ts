function generateRandomFourDigitNumber() {
    const randomNum = Math.floor(Math.random() * 9000) + 1000;
    return randomNum;
}

function validateInput(email: string | null, phoneNumber: number | null): boolean {
    return email !== null || phoneNumber !== null;
}

export {generateRandomFourDigitNumber, validateInput}