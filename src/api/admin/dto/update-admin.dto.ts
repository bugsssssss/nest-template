import { PartialType } from "@nestjs/mapped-types";
import { CreateAdminDto, CreateAdminDtoWithRole } from "./create-admin.dto";

export class UpdateAdminDto extends PartialType(CreateAdminDtoWithRole) {}
