function isValidEmail(email) {
    const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return re.test(email.toLowerCase());
}

function isValidCpfCnpj(cpfOuCnpj) {
    if (!cpfOuCnpj) return false;

    cpfOuCnpj = cpfOuCnpj.replace(/\D/g, '');

    if (cpfOuCnpj.length === 11) {
        return isValidCpf(cpfOuCnpj);
    } else if (cpfOuCnpj.length === 14) {
        return isValidCnpj(cpfOuCnpj);
    }

    return false;
}

function isValidCpf(cpf) {
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    const calcCheckDigit = (cpf, factor) => {
        let sum = 0;
        for (let i = 0; i < factor - 1; i++) {
            sum += parseInt(cpf.charAt(i)) * (factor - i);
        }
        let remainder = (sum * 10) % 11;
        return remainder === 10 || remainder === 11 ? 0 : remainder;
    };

    const firstCheckDigit = calcCheckDigit(cpf, 10);
    const secondCheckDigit = calcCheckDigit(cpf, 11);

    return firstCheckDigit === parseInt(cpf.charAt(9)) && secondCheckDigit === parseInt(cpf.charAt(10));
}

function isValidCnpj(cnpj) {    
    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;

    const calcCheckDigit = (cnpj, factor) => {
        let sum = 0;
        let pos = factor - 7;
        for (let i = 0; i < factor; i++) {
            sum += cnpj.charAt(i) * pos--;
            if (pos < 2) pos = 9;
        }
        const remainder = sum % 11 < 2 ? 0 : 11 - (sum % 11);
        return remainder;
    };

    const firstCheckDigit = calcCheckDigit(cnpj, 12);
    const secondCheckDigit = calcCheckDigit(cnpj, 13);

    return firstCheckDigit === parseInt(cnpj.charAt(12)) && secondCheckDigit === parseInt(cnpj.charAt(13));
}

function isValidDate(dateString) {
    const date = new Date(dateString);
    const isValid = !isNaN(date.getTime());

    return isValid && dateString === date.toISOString().substring(0, 10);
}

module.exports = {
    isValidEmail,
    isValidCpfCnpj,
    isValidDate
}