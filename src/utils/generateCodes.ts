import { supabase } from '../lib/supabase';

function generateRandomCode(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export async function generateUniqueCodes(count: number): Promise<string[]> {
  const codes: string[] = [];
  const existingCodes = new Set<string>();

  // Get existing codes from database
  const { data: existingData } = await supabase
    .from('raffle_codes')
    .select('code');

  if (existingData) {
    existingData.forEach(item => existingCodes.add(item.code));
  }

  // Generate new unique codes
  while (codes.length < count) {
    const newCode = generateRandomCode();
    if (!existingCodes.has(newCode)) {
      codes.push(newCode);
      existingCodes.add(newCode);
    }
  }

  // Insert new codes into database
  const { error } = await supabase
    .from('raffle_codes')
    .insert(codes.map(code => ({ code })));

  if (error) {
    throw new Error('Failed to insert codes into database');
  }

  return codes;
} 