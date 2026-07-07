export const labels = {
  siteName: "Світ Рамок",
  pageTitle: "Конструктор рам",
  pageDescription:
    "Онлайн-конструктор рам — оберіть багет, паспарту та скло",
  homeTitle: "Створіть ідеальну раму",
  homeDescription:
    "Оберіть багет, паспарту та скло — і одразу побачте результат на стіні.",
  openConstructor: "Відкрити конструктор",
  backToHome: "На головну",

  sectionSize: "Розмір полотна",
  widthCm: "Ширина (см)",
  heightCm: "Висота (см)",

  sectionImage: "Зображення",
  uploadImage: "Завантажити зображення",
  removeImage: "Видалити зображення",
  uploadHint: "JPG, PNG або WEBP",

  sectionFrame: "Багет",
  material: "Матеріал",
  materialAll: "Усі",
  materialPlastic: "Пластик",
  materialWood: "Дерево",
  color: "Колір",
  colorAll: "Усі кольори",
  frameWidth: "Ширина профілю",

  sectionPaspartu: "Паспарту",
  addPaspartu: "Додати паспарту",
  paspartuWidth: "Ширина паспарту",

  sectionGlass: "Скло",

  sectionWall: "Фон стіни",

  sectionPrice: "Орієнтовна вартість",
  currency: "грн",
  priceNote: "Ціна орієнтовна, без урахування доставки",

  previewEmpty: "Завантажте зображення для перегляду",
  previewSize: (w: number, h: number) => `${w} × ${h} см`,

  errorUpload: "Сталася помилка при завантаженні зображення",
  errorSize: "Розмір має бути від 10 до 120 см",
  errorFileType: "Дозволені лише зображення (JPG, PNG, WEBP)",
} as const;
