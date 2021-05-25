export default function (num) {
    // console.log(Number(num));
    const n = isNaN(num) ? Number(0) : Number(num);
    
    return `$${n.toFixed(0).replace(/./g, (c, i, a) => {
      const currency = (i && c !== '.' && ((a.length - i) % 3 === 0) ? `, ${c}`.replace(/\s/g, '') : c);
      return currency;
    })}`;
  }