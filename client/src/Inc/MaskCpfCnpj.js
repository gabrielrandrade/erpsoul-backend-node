export default function mask(cpfOuCnpj) {
    cpfOuCnpj = cpfOuCnpj.replace(/\D/g, "");

    if (cpfOuCnpj.length <= 11) {
        cpfOuCnpj = cpfOuCnpj.replace(/(\d{3})(\d)/, "$1.$2");
        cpfOuCnpj = cpfOuCnpj.replace(/(\d{3})(\d)/, "$1.$2");
        cpfOuCnpj = cpfOuCnpj.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else {
        cpfOuCnpj = cpfOuCnpj.replace(/^(\d{2})(\d)/, "$1.$2");
        cpfOuCnpj = cpfOuCnpj.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
        cpfOuCnpj = cpfOuCnpj.replace(/\.(\d{3})(\d)/, ".$1/$2");
        cpfOuCnpj = cpfOuCnpj.replace(/(\d{4})(\d)/, "$1-$2");
    }

    return cpfOuCnpj;
}

export function formatCpfCnpj(value) {
    if (value.length === 11) {
        return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    } else if (value.length === 14) {
        return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
    }
    
    return value;
}