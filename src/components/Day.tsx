export const Day = () => {
  const today = new Date();
  const year = today.getUTCFullYear();
  const month = today.getUTCMonth() + 1;
  const day = today.getUTCDate();

  return (
    <h1>
      {`${year}年${month}月${day}日`}
    </h1>
  )
}