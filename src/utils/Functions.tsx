export const convertLeadsToCSV = (leads: any) => {
  const header = ["Name", "Email", "Credits", "Plan"];
  const csvRows = [header.join(",")];
  for (const lead of leads) {
    const row = [
      lead.full_name,
      lead.email,
      lead.allowed_msg_credits,
      lead.plan_id,
    ];
    csvRows.push(row.join(","));
  }
  return csvRows.join("\n");
};

export const convertAdminsToCSV = (leads: any) => {
  const header = ["Name", "Email"];
  const csvRows = [header.join(",")];
  for (const lead of leads) {
    const row = [lead.full_name, lead.email];
    csvRows.push(row.join(","));
  }
  return csvRows.join("\n");
};
