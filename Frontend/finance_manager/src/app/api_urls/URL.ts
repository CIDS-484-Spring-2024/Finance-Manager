//This file organizes the api endpoints into a JSON object
export const endpoints =
{
  'checkLogin':'http://localhost:3200/users/login',
  'signup':'http://localhost:3200/users/signup',
  'getUserDetails':'http://localhost:3200/form/getForm/',//append `${this.email for proper usage}`
  'postForm': 'http://localhost:3200/form/postDetails'
};
