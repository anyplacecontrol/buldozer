export const FAKE_CERTIFICATES = [
  {
    id: "100703920390",
    validityPeriodInMonths: 9,        
    activeFromDate: "2021-06-17T12:54:51.000000Z",
    activeToDate: "2022-03-17T12:54:51.000000Z",
    isActive: false,    
    createdUser: {
      id: 6,
      //name: "Иванова Вероника Евгеньевна",
      email: "vladimirova.anzelika@example.org",
      //phone: "8-800-959-5848",
      //isActive: true,
      //createdDate: "2021-06-17T12:54:51.000000Z"
    },
    isRedeemed: false,
    amount: 1000,
        
    //createdDate: "2021-06-17T12:54:58.000000Z",
    
    recipientComment:
      "Quo quis mollitia laboriosam recusandae est. Ut quo doloribus doloribus facere id.",    
    recipient: {
      id: 5842,
      name: "Георгий Александрович Коновалова",
      //email: "marta71@example.org",
      //company: "МКК ЭлектроСантехАлмазТраст",
      //address: "947502, Ульяновская область, город Пушкино, пр. Чехова, 57",
      //phone: "(35222) 76-3090",
      //comment: "Et odit sit tempore ea ut.",
      //isActive: true,
      //createdDate: "2021-06-17T12:55:29.000000Z"
    },
    serviceType: {
      id: 38,
      name: "A minima eos"
    },
    issuingRestaurant: {
      id: 156,
      name: "ООО БашкирГараж",
      //email: "florentina99@example.com",
      //address: "293052, Московская область, город Егорьевск, пр. Гагарина, 96",
      //phone: "8-800-992-9393",
      //comment:
      //  "Facere ratione tenetur qui iure dolores. Architecto similique aut mollitia omnis quaerat sit vitae porro. Rerum et et quia soluta saepe enim consequatur.",
      //isActive: false,
      //createdDate: "2021-06-17T12:55:36.000000Z"
    },
    redeemerRestaurant: {
      //id: 516,
      name: "ООО Компания ITКазТекстиль-М",
      //email: "eva90@example.com",
      //address:
      //  "943285, Ленинградская область, город Красногорск, проезд Ломоносова, 78",
      //phone: "(495) 472-0298",
      comment:
        "Et dignissimos assumenda pariatur ullam illo eveniet assumenda. Soluta eius omnis sed iusto fuga sit ex debitis. Mollitia velit aperiam commodi saepe architecto.",
      //isActive: true,
      //createdDate: "2021-06-17T12:55:37.000000Z"
    }
  }
];

export const FAKE_CERTIFICATES_RESPONSE = {
  items: FAKE_CERTIFICATES,
  count: FAKE_CERTIFICATES.length,
  topRowNumber: 0
};
