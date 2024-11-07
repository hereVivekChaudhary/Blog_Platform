const { model } = require("mongoose");

const sampleListing = [
  {
    title: "Taj Mahal",
    description:
      "The Taj Mahal is an ivory-white marble mausoleum on the south bank of the Yamuna river in the Indian city of Agra. It was commissioned in 1632 by the Mughal emperor, Shah Jahan (reigned from 1628 to 1658), to house the tomb of his favourite wife, Mumtaz Mahal.",
      image: {
        filename: "listingimage",
        url: "https://lh3.googleusercontent.com/p/AF1QipN4sO59P-VTi9bc9Qgx8rrQ_1J4EnM44Bts5avz=s1360-w1360-h1020",
      },
 
    country: "India",
    location: "Agra",
  },
  {
    title: "Statue of Unity",
    description:
      "It depicts Indian statesman and independence activist Vallabhbhai Patel (1875-1950), who was the first deputy prime minister and home minister of independent India and an adherent of Mahatma Gandhi. Patel is highly respected for playing a significant role in the political integration of India.",
      image: {
        filename: "listingimage",
        url: "https://t4.ftcdn.net/jpg/04/57/13/89/360_F_457138917_CMIfwv6U785yncAzsJ9sgUKypWyFxE64.jpg",
      },
  
    country: "India",
    location: "Gujrat",
  },
  {
    title: "Red Fort",
    description:
      "The Red Fort Complex was built as the palace fort of Shahjahanabad - the new capital of the fifth Mughal Emperor of India, Shah Jahan. Named for its massive enclosing walls of red sandstone, it is adjacent to an older fort, the Salimgarh, built by Islam Shah Suri in 1546, with which it forms the Red Fort Complex.",
      image: {
        filename: "listingimage",
        url:"https://lh3.googleusercontent.com/p/AF1QipNT3MFYBjz2Mf13lhr3Ib3742ksR0rVlVphOy5z=s1360-w1360-h1020",
      },
   
    country: "India",
    location: "Delhi",
  },
  {
    title: "Kedarnath Mahadev Temple",
    description:
      "The Temple at Kedarnath presents an imposing sight, standing in middle of a wide plateau surrounded by lofty snow covered peaks. The temple was originally built in 8th century A.D. by Jagad Guru Adi Shankaracharya and stands adjacent to site of an even earlier temple built by the Pandavas.",
      image: {
        filename: "listingimage",
        url:"https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcRU08vLiuiNWFo_oDrsrWf4azWUOsCg6rDUAUacDTpCX8aPaqcG8ZNq580EH5uhl5ezoNXxsQdhqWDPrjHtiQjoY_22-GStRqa1_oB8aA",
      },
    
    country: "India",
    location: "Uttrakhand",
}
];

module.exports = { data: sampleListing };
