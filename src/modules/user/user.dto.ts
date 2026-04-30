import { IsString, IsNotEmpty, IsEnum, IsOptional, IsObject } from 'class-validator';
import { UserIntent, TeamSize, UserRole } from '../../database/enums';

export class OnboardingDto {
  @IsNotEmpty()
  @IsEnum(UserIntent)
  intent!: UserIntent;

  @IsNotEmpty()
  @IsEnum(TeamSize)
  teamSize!: TeamSize;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @IsOptional()
  @IsString()
  intent?: string;

  @IsOptional()
  @IsString()
  teamSize?: string;
}

export class UpdateSettingsDto {
  @IsOptional()
  @IsObject()
  settings?: Record<string, any>;
}
