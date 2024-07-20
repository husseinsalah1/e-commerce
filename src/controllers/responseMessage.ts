const responseMessage = (success: boolean, data: any, message: string) => {
  return {
    success,
    message,
    data,
  };
};

export default responseMessage;
