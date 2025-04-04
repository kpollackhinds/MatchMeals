interface User {
  id: string;
  email: string;
  info: {
    name: string;
    phone: string;
  };
  preferences: {
    radius: number;
    openOnly: boolean;
    food_categories: string[];
  };
  createdAt: Date;
  updatedAt: Date;
  friends: string[];
}

export default User;
