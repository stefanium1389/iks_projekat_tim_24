export interface UserDTO{
  id:number;
	name:string;
	surname:string;
	profilePicture:string;
	telephoneNumber: string,
	email:string;
	address:string;
}
export interface UserRegistrationDTO{
	name:string;
	surname:string;
	profilePicture:string;
	telephoneNumber: string,
	email:string;
	address:string;
	password:string;
}
export interface UserUpdateDTO{
	name:string;
	surname:string;
	profilePicture:string;
	telephoneNumber: string,
	email:string;
	address:string;
	password:string;
}

export interface UserRef{
	id:number;
	email:string;
}