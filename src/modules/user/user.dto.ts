import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
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
