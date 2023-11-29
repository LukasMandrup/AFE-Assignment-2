interface User {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    personalTrainerId: number | null;
    accountType: string | null;
  }
  
  export default User;