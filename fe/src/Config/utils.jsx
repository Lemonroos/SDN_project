export const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  }
  
  export const formatNumber = (value) => {
    return new Intl.NumberFormat().format(value);
  }
  