export const Day = () => {
  const today = new Date();
  const year = today.getUTCFullYear();
  const month = today.getUTCMonth() + 1;
  const day = today.getUTCDate();
  
  return (
    `${year}年${month}月${day}日`
  )
}