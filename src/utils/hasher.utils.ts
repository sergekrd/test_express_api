import * as bcrypt from "bcrypt";

export class Hasher {
  private rounds = Number(process.env.HASH_SALT_ROUNDS)
  public async hashAsync(value: string): Promise<string> {
    return bcrypt.hash(value, this.rounds);
  }

  public hashSync(value: string): string {
    return bcrypt.hashSync(value, this.rounds);
  }

  public async comparer(value: string, hashedValue: string): Promise<boolean> {
    if (!value || !hashedValue) return false;
    return bcrypt.compare(value, hashedValue);
  }
}
