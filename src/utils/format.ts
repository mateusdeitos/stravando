export const formatNumber = (number: number): string => {
	return new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 }).format(number);
}