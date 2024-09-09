export type TokenInfo = {
  address: string;
  address_label: string | null;
  name: string;
  symbol: string;
  decimals: string;
  logo: string | null;
  logo_hash: string | null;
  thumbnail: string | null;
  total_supply: string;
  total_supply_formatted: string;
  fully_diluted_valuation: string;
  block_number: string;
  validated: number;
  created_at: string;
  possible_spam: boolean;
  verified_contract: boolean;
  categories: string[]; // Assuming categories is an array of strings
  links: Record<string, string>; // Assuming links is a dictionary of string key-value pairs
  security_score: number | null;
};
