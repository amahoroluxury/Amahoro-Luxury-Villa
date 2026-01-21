export interface Review {
  id: string;
  name: string;
  date: string;
  text: string;
  image: string;
  rating: number;
}

export const reviews: Review[] = [
  {
    id: '1',
    name: 'Tony',
    date: 'November 2025',
    text: "Toby's place was amazing.The ambience,the hospitality, and the safety of the place was superb.I will most definitely visit the villa again and recommend my traveller friends to visit.",
    image: 'https://a0.muscache.com/im/pictures/user/7edba5eb-125b-44d9-a035-dc7693a589cc.jpg?im_w=240',
    rating: 5
  },
  {
    id: '2',
    name: 'Sabir',
    date: 'October 2025',
    text: "Excellent Villa, well maintained, and great experience. It is really a 5 Star accommodation. Good for big families or friends. Has a beautiful garden. Small shop across the road. Definitely will stay again. Thanks for Toby to make this accommodation available.",
    image: 'https://a0.muscache.com/im/pictures/user/57f9ea7d-4ecf-41b5-b19d-38ffa04c4493.jpg?im_w=240',
    rating: 5
  },
  {
    id: '3',
    name: 'Gerald',
    date: 'September 2025',
    text: "Excellent location in the heart of kigali , yet gives you the vibe of being in the hills. The in house staff Bryan was super amazing and 100% responsive. I came with 3 friends and Bryan attended to everyone like there was a dozen of him. His use of English is good and he was always ready to help with any local needs. All in all, amazing stay. Thank you Toby and Shema",
    image: 'https://a0.muscache.com/im/pictures/user/f96711d2-6ab1-4230-85da-a6de7694409b.jpg?im_w=240',
    rating: 5
  },
  {
    id: '4',
    name: 'Cindy',
    date: 'September 2025',
    text: "This was a beautiful and exceptionally clean home, exactly as pictured and described online. The location was perfect, with easy access to everything we needed, and the host Shema and Brayan was responsive and welcoming. We had a wonderful stay and would highly recommend this property!",
    image: 'https://a0.muscache.com/im/pictures/user/adabfe7a-f731-4c2f-8255-e212447e3fc9.jpg?im_w=240',
    rating: 5
  },
  {
    id: '5',
    name: 'Nuru',
    date: 'September 2025',
    text: "We had a wonderful stay! Bryan (The gatekeeper) was always available whenever we needed anything. The home was spotless, well-maintained, and very comfortable. The pictures don’t do it justice. Thank you for making us feel safe and home. Highly recommend.",
    image: 'https://a0.muscache.com/im/pictures/user/1365d8fa-7a84-4e2d-9d4e-9b16b437864a.jpg?im_w=240',
    rating: 5
  },
  {
    id: '6',
    name: 'Thomas',
    date: 'November 2025',
    text: "This is a 5-star property in a fantastic neighborhood and perfect view",
    image: 'https://a0.muscache.com/im/pictures/user/be6ac237-9312-4c6c-a749-022070140277.jpg?im_w=240',
    rating: 5
  }
];
