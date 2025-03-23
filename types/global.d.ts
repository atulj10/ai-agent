declare module "bcryptjs" {
  /**
   * Synchronously generates a hash for the given string.
   * @param s The string to hash
   * @param salt The salt length to generate or the salt to use
   */
  export function hashSync(s: string, salt: string | number): string;

  /**
   * Asynchronously generates a hash for the given string.
   * @param s The string to hash
   * @param salt The salt length to generate or the salt to use
   * @param callback Callback receiving the error, if any, and the resulting hash
   */
  export function hash(
    s: string,
    salt: string | number,
    callback?: (err: Error | null, hash: string) => void
  ): Promise<string>;

  /**
   * Synchronously compares the given data against the given hash.
   * @param s The string to compare
   * @param hash The hash to compare to
   */
  export function compareSync(s: string, hash: string): boolean;

  /**
   * Asynchronously compares the given data against the given hash.
   * @param s The string to compare
   * @param hash The hash to compare to
   * @param callback Callback receiving the error, if any, and the resulting value
   */
  export function compare(
    s: string,
    hash: string,
    callback?: (err: Error | null, same: boolean) => void
  ): Promise<boolean>;

  /**
   * Synchronously generates a salt.
   * @param rounds A positive integer to specify the number of rounds
   */
  export function genSaltSync(rounds?: number): string;

  /**
   * Asynchronously generates a salt.
   * @param rounds A positive integer to specify the number of rounds
   * @param callback Callback receiving the error, if any, and the resulting salt
   */
  export function genSalt(
    rounds?: number,
    callback?: (err: Error | null, salt: string) => void
  ): Promise<string>;
}
