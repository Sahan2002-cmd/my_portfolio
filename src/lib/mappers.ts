export function rowToProject(row: any) {
  if (!row) return row;
  return {
    _id: row.id,
    title: row.title,
    description: row.description,
    date: row.date,
    techStack: row.tech_stack || [],
    link: row.link,
    github: row.github,
    order: row.order,
    attachment: row.attachment,
    attachmentType: row.attachment_type,
    attachmentName: row.attachment_name,
  };
}

export function projectToRow(data: any) {
  const row: any = {};
  if (data.title !== undefined) row.title = data.title;
  if (data.description !== undefined) row.description = data.description;
  if (data.date !== undefined) row.date = data.date;
  if (data.techStack !== undefined) row.tech_stack = data.techStack;
  if (data.link !== undefined) row.link = data.link;
  if (data.github !== undefined) row.github = data.github;
  if (data.order !== undefined) row.order = data.order;
  if (data.attachment !== undefined) row.attachment = data.attachment;
  if (data.attachmentType !== undefined) row.attachment_type = data.attachmentType;
  if (data.attachmentName !== undefined) row.attachment_name = data.attachmentName;
  return row;
}

export function rowToSkill(row: any) {
  if (!row) return row;
  return { _id: row.id, name: row.name, category: row.category, order: row.order };
}

export function skillToRow(data: any) {
  const row: any = {};
  if (data.name !== undefined) row.name = data.name;
  if (data.category !== undefined) row.category = data.category;
  if (data.order !== undefined) row.order = data.order;
  return row;
}

export function rowToExperience(row: any) {
  if (!row) return row;
  return {
    _id: row.id,
    role: row.role,
    company: row.company,
    period: row.period,
    description: row.description,
    type: row.type,
    order: row.order,
    attachment: row.attachment,
    attachmentType: row.attachment_type,
    attachmentName: row.attachment_name,
  };
}

export function experienceToRow(data: any) {
  const row: any = {};
  if (data.role !== undefined) row.role = data.role;
  if (data.company !== undefined) row.company = data.company;
  if (data.period !== undefined) row.period = data.period;
  if (data.description !== undefined) row.description = data.description;
  if (data.type !== undefined) row.type = data.type;
  if (data.order !== undefined) row.order = data.order;
  if (data.attachment !== undefined) row.attachment = data.attachment;
  if (data.attachmentType !== undefined) row.attachment_type = data.attachmentType;
  if (data.attachmentName !== undefined) row.attachment_name = data.attachmentName;
  return row;
}

export function rowToCertificate(row: any) {
  if (!row) return row;
  return {
    _id: row.id,
    title: row.title,
    organization: row.organization,
    year: row.year,
    credentialId: row.credential_id,
    imageKey: row.image_key,
    description: row.description,
    image: row.image,
    status: row.status,
    attachment: row.attachment,
    attachmentType: row.attachment_type,
    attachmentName: row.attachment_name,
  };
}

export function certificateToRow(data: any) {
  const row: any = {};
  if (data.title !== undefined) row.title = data.title;
  if (data.organization !== undefined) row.organization = data.organization;
  if (data.year !== undefined) row.year = data.year;
  if (data.credentialId !== undefined) row.credential_id = data.credentialId;
  if (data.imageKey !== undefined) row.image_key = data.imageKey;
  if (data.description !== undefined) row.description = data.description;
  if (data.image !== undefined) row.image = data.image;
  if (data.status !== undefined) row.status = data.status;
  if (data.attachment !== undefined) row.attachment = data.attachment;
  if (data.attachmentType !== undefined) row.attachment_type = data.attachmentType;
  if (data.attachmentName !== undefined) row.attachment_name = data.attachmentName;
  return row;
}

export function rowToMessage(row: any) {
  if (!row) return row;
  return {
    _id: row.id,
    name: row.name,
    email: row.email,
    subject: row.subject,
    message: row.message,
    createdAt: row.created_at,
  };
}