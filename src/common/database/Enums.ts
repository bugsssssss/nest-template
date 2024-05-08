enum Roles {
	// SUPER_ADMIN = "super_admin",
	ADMIN = "admin", // has access all routes
	MANAGER = "manager", // cannot crud salers
}



enum PaymentType {
	CASH = "cash",
	CARD = "card",
	TRANSFER = "transfer",
}

export {
	Roles,
	PaymentType,
};
