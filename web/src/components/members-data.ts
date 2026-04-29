import membersData from "./members.json";

export type Member = {
  no: number;
  id: number;
  name: string;
  taxId: string;
  province: string;
  phoneNumber: string;
};

export const members: Member[] = membersData as Member[];

export function splitProvinces(p: string): string[] {
  return p
    .split(/[,]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function splitPhones(p: string): string[] {
  return p
    .split(/[,/]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export const allProvinces = Array.from(
  new Set(members.flatMap((m) => splitProvinces(m.province))),
).sort((a, b) => a.localeCompare(b, "th"));
