export interface UserDTO {
	id: number;
	name: string;
	surname: string;
	profilePicture: string;
	telephoneNumber: string,
	email: string;
	address: string;
}
export interface UserRegistrationDTO {
	name: string;
	surname: string;
	profilePicture: string | null;
	telephoneNumber: string,
	email: string;
	address: string;
	password: string;
}
export interface UserUpdateDTO {
	name: string;
	surname: string;
	profilePicture: string;
	telephoneNumber: string,
	email: string;
	address: string;
	password: string;
}

export interface PassengerUpdateDTO {
	name: string;
	surname: string;
	profilePicture: string;
	telephoneNumber: string,
	email: string;
	address: string;
}

export interface PasswordChangeDTO {
	oldPassword: string;
	newPassword: string;
}

export interface UserRef {
	id: number;
	email: string;
}

export interface UserCardDTO {
	id: number;
	name: string;
	surname: string;
	profilePicture: string;
	role:string;
	email:string;
}

export interface DriverReportDTO {
	id: number;
	driverId: number;
	reason: string;
}