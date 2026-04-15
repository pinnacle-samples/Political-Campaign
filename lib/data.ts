// Upcoming Events
export const upcomingEvents = [
  {
    id: 'town-hall-sf',
    name: 'Town Hall - San Francisco',
    date: 'November 26, 2027',
    time: '7:00 PM',
    location: 'SF City Hall, San Francisco, CA',
    description:
      'Join the Ascend campaign for a town hall discussion on healthcare, education, and economic opportunity',
    address: '1 Dr Carlton B Goodlett Pl, San Francisco, CA 94102',
    lat: 37.7793,
    lng: -122.4193,
    capacity: 500,
    registered: 342,
    media: 'https://server.trypinnacle.app/storage/v1/object/public/pinnacle-public-assets/ARC/ascend/event-town-hall-sf.png',
  },
  {
    id: 'rally-berkeley',
    name: 'Campaign Rally - Berkeley',
    date: 'November 30, 2027',
    time: '3:00 PM',
    location: 'UC Berkeley Campus, Berkeley, CA',
    description: 'A rally focused on civil rights and social justice',
    address: 'Sproul Plaza, Berkeley, CA 94720',
    lat: 37.8697,
    lng: -122.2595,
    capacity: 1000,
    registered: 756,
    media: 'https://server.trypinnacle.app/storage/v1/object/public/pinnacle-public-assets/ARC/ascend/event-rally-berkeley.png',
  },
  {
    id: 'fundraiser-dinner',
    name: 'Fundraising Dinner',
    date: 'December 3, 2027',
    time: '6:30 PM',
    location: 'The Fairmont, San Francisco, CA',
    description: 'Join the Ascend campaign and special guests for an exclusive fundraising dinner',
    address: '950 Mason St, San Francisco, CA 94108',
    lat: 37.7924,
    lng: -122.4104,
    capacity: 150,
    registered: 148,
    media: 'https://server.trypinnacle.app/storage/v1/object/public/pinnacle-public-assets/ARC/ascend/event-fundraiser.png',
  },
  {
    id: 'youth-forum',
    name: 'Youth Leadership Forum',
    date: 'December 6, 2027',
    time: '2:00 PM',
    location: 'Stanford University, Palo Alto, CA',
    description: 'The Ascend campaign speaks with young voters about the future of America',
    address: '450 Serra Mall, Stanford, CA 94305',
    lat: 37.4275,
    lng: -122.1697,
    capacity: 300,
    registered: 287,
    media: 'https://server.trypinnacle.app/storage/v1/object/public/pinnacle-public-assets/ARC/ascend/event-youth-forum.png',
  },
];

// Policy Positions
export const policyPositions = [
  {
    id: 'civil-rights',
    title: 'Civil Rights',
    quote: 'I believe in an America where the rights that I have described are enjoyed by all.',
    description:
      "I believe in a nation where every citizen, regardless of race, religion, or background, has equal rights and opportunities. We must enforce desegregation, protect voting rights, and ensure justice for all. The struggle for civil rights is the struggle for America's soul. We cannot be satisfied until justice rolls down like waters and righteousness like a mighty stream. Our Constitution promises equality, but we must make that promise a reality through action. Federal intervention is necessary to protect those whose rights are denied. We will work with Congress to pass comprehensive civil rights legislation that ensures equal access to education, employment, housing, and public facilities. No American should face discrimination because of the color of their skin, their faith, or where they come from. This is not just a legal issue—it is a moral imperative. America was founded on the principle that all men are created equal, and we must live up to that founding promise. The world is watching to see if we practice what we preach about democracy and freedom.",
    icon: '⚖️',
    media: 'https://server.trypinnacle.app/storage/v1/object/public/pinnacle-public-assets/ARC/ascend/policy-civil-rights.png',
    keyPoints: [
      'Federal enforcement of school desegregation',
      'Voting rights protection',
      'Fair employment practices',
      'Equal access to public accommodations',
    ],
  },
  {
    id: 'space-exploration',
    title: 'Space Program',
    quote: 'We rise not by waiting for a better future, but by building it together.',
    description:
      'America must lead in space exploration to secure our future and inspire generations. This decade will see us land on the moon and establish our nation as the leader in science and technology. The exploration of space will go ahead whether we join in it or not, and it is one of the great adventures of all time. No nation which expects to be the leader of other nations can expect to stay behind in this race for space. We choose to go to the moon in this decade and do the other things, not because they are easy, but because they are hard, because that goal will serve to organize and measure the best of our energies and skills. This challenge is one we are willing to accept, one we are unwilling to postpone, and one we intend to win. Space science and technology will drive innovation across every industry, create millions of jobs, and inspire our young people to pursue careers in science and engineering. The rockets and satellites we build today will secure our national defense tomorrow.',
    icon: '🚀',
    media: 'https://server.trypinnacle.app/storage/v1/object/public/pinnacle-public-assets/ARC/ascend/policy-science-innovation.png',
    keyPoints: [
      "Expand America's leadership in space exploration",
      'Invest in NASA and aerospace research',
      'Inspire STEM education nationwide',
      'Maintain technological superiority',
    ],
  },
  {
    id: 'healthcare',
    title: 'Healthcare for Seniors',
    quote: 'We believe in an America where every citizen can afford to be sick.',
    description:
      "Healthcare is a right, not a privilege. We must establish Medicare to ensure our seniors receive the medical care they deserve after a lifetime of contribution. Too many of our elderly citizens face the choice between buying food and buying medicine, between paying rent and paying hospital bills. This is unacceptable in the wealthiest nation on earth. Medicare will provide hospital insurance for Americans over 65, ensuring that illness in old age does not mean financial ruin. Our senior citizens built this country—they fought our wars, raised our families, and worked in our factories and farms. They deserve dignity and security in their retirement years. We will also expand access to preventive care, prescription drug coverage, and long-term care facilities. A healthy population is a productive population, and investing in healthcare is investing in America's future. This program will be funded through payroll contributions, ensuring its sustainability for generations to come.",
    icon: '🏥',
    media: 'https://server.trypinnacle.app/storage/v1/object/public/pinnacle-public-assets/ARC/ascend/policy-healthcare.png',
    keyPoints: [
      'Create Medicare for seniors',
      'Hospital insurance coverage',
      'Prescription drug assistance',
      'Long-term care support',
    ],
  },
  {
    id: 'education',
    title: 'Education',
    quote: 'Let us think of education as the means of developing our greatest abilities.',
    description:
      "Education is the foundation of our democracy. We must invest in schools, support teachers, and ensure every American child has access to quality education. The pursuit of knowledge is the key to unlocking human potential and building a prosperous nation. We need more classrooms, better-equipped laboratories, and higher salaries to attract and retain the best teachers. Federal aid to education is not federal control—it is a partnership to ensure that every child, regardless of where they live or their family's income, has the opportunity to develop their talents. We will establish scholarship programs to help qualified students attend college, because economic barriers should never prevent capable minds from reaching their full potential. Adult education and literacy programs will help those who missed educational opportunities in their youth. An educated citizenry is essential for self-government and economic competitiveness. The nation that out-educates us today will out-compete us tomorrow.",
    icon: '📚',
    media: 'https://server.trypinnacle.app/storage/v1/object/public/pinnacle-public-assets/ARC/ascend/policy-education.png',
    keyPoints: [
      'Federal aid for public schools',
      'Higher teacher salaries',
      'College scholarship programs',
      'Adult education and literacy',
    ],
  },
  {
    id: 'peace-corps',
    title: 'Peace Corps',
    quote: 'The strength of a nation is measured by the service of its people.',
    description:
      "For more than sixty years the Peace Corps has sent Americans abroad to serve — and today, it matters more than ever. In a world reshaped by climate change, migration, and growing inequality, we will reinvest in and expand the Peace Corps for a new generation. We will double its size, modernize its mission, and mobilize the skills of young Americans to serve in developing countries: teaching in schools, supporting sustainable agriculture, building climate-resilient infrastructure, and delivering healthcare. This is not charity — it is partnership. It is person-to-person diplomacy that shows the world the true face of America: generous, capable, and dedicated to human dignity. Volunteers will live and work alongside the people they serve, learning as much as they teach and building bridges of understanding that no amount of hard power can construct. A reinvigorated Peace Corps gives our young people the chance to serve their country and humanity in the most meaningful way possible, while projecting American leadership through the one currency that never depreciates: trust.",
    icon: '🕊️',
    media: 'https://server.trypinnacle.app/storage/v1/object/public/pinnacle-public-assets/ARC/ascend/policy-peace-corps.png',
    keyPoints: [
      'Double the size of the Peace Corps',
      'Deploy volunteers to developing nations',
      'Promote education and healthcare abroad',
      'Build international goodwill',
    ],
  },
  {
    id: 'economy',
    title: 'Economic Growth',
    quote: 'Our growing economy must benefit all Americans, not just a privileged few.',
    description:
      "We must stimulate economic growth through investment in infrastructure, education, and innovation. Tax cuts will put money back in workers' pockets. Our economy has tremendous potential, but we need policies that unlock growth and create opportunity for all Americans. Strategic tax cuts will provide incentives for business investment and increase consumer purchasing power, driving demand and job creation. We will invest in highways, bridges, airports, and telecommunications infrastructure—the arteries of commerce that connect our nation. Small businesses are the backbone of our economy, and we will ensure they have access to capital and support to grow. We must also invest in research and development, particularly in emerging technologies that will define the industries of tomorrow. Economic growth is not just about statistics—it's about families being able to afford a home, send their kids to college, and retire with dignity. A rising tide lifts all boats, and our policies will ensure that prosperity is widely shared across all regions and communities.",
    icon: '💼',
    media: 'https://server.trypinnacle.app/storage/v1/object/public/pinnacle-public-assets/ARC/ascend/policy-economy.png',
    keyPoints: [
      'Tax cuts for working families',
      'Infrastructure investment',
      'Job creation programs',
      'Support for small businesses',
    ],
  },
];

// Volunteer Opportunities
export const volunteerOpportunities = [
  {
    id: 'canvassing',
    title: 'Door-to-Door Canvassing',
    category: 'Field Work',
    timeCommitment: '4-6 hours',
    location: 'Your neighborhood',
    description: "Talk to voters in your community about the Ascend vision for America",
    icon: '🚪',
    media: 'https://server.trypinnacle.app/storage/v1/object/public/pinnacle-public-assets/ARC/ascend/volunteer-canvassing.png',
  },
  {
    id: 'phone-banking',
    title: 'Phone Banking',
    category: 'Remote',
    timeCommitment: '2-3 hours',
    location: 'From home',
    description: 'Call voters to discuss key issues and encourage turnout',
    icon: '📞',
    media: 'https://server.trypinnacle.app/storage/v1/object/public/pinnacle-public-assets/ARC/ascend/volunteer-phone-banking.png',
  },
  {
    id: 'event-staff',
    title: 'Event Volunteer',
    category: 'Events',
    timeCommitment: '4-8 hours',
    location: 'Campaign events',
    description: 'Help organize and run campaign rallies and town halls',
    icon: '🎪',
    media: 'https://server.trypinnacle.app/storage/v1/object/public/pinnacle-public-assets/ARC/ascend/volunteer-event-staff.png',
  },
  {
    id: 'voter-registration',
    title: 'Voter Registration',
    category: 'Field Work',
    timeCommitment: '3-5 hours',
    location: 'Community centers, colleges',
    description: 'Help register new voters and ensure everyone can participate',
    icon: '📝',
    media:
      'https://server.trypinnacle.app/storage/v1/object/public/pinnacle-public-assets/ARC/ascend/volunteer-voter-registration.png',
  },
];

// Donation Tiers
export const donationTiers = [
  {
    id: 'supporter',
    amount: 25,
    title: 'Supporter',
    description: 'Help fund campaign materials and grassroots organizing',
    perks: ['Campaign sticker', 'Phone updates'],
    media:
      'https://server.trypinnacle.app/storage/v1/object/public/pinnacle-public-assets/ARC/ascend/donation-supporter.png',
  },
  {
    id: 'advocate',
    amount: 50,
    title: 'Advocate',
    description: 'Support voter outreach and community events',
    perks: ['Campaign button and sticker', 'Exclusive policy briefs', 'Phone updates'],
    media:
      'https://server.trypinnacle.app/storage/v1/object/public/pinnacle-public-assets/ARC/ascend/donation-advocate.png',
  },
  {
    id: 'champion',
    amount: 100,
    title: 'Champion',
    description: 'Power our ground game in key states',
    perks: ['Campaign t-shirt', 'Signed photo', 'Priority event access', 'All lower tier perks'],
    media:
      'https://server.trypinnacle.app/storage/v1/object/public/pinnacle-public-assets/ARC/ascend/donation-champion.png',
  },
];

// Voting Information
export const votingInfo = {
  registrationDeadline: 'October 13, 2028',
  earlyVotingStarts: 'October 21, 2028',
  electionDay: 'November 7, 2028',
  howToRegister: [
    'Visit your local town/city hall',
    'Register online at state election website',
    'Mail in a voter registration form',
    'Register at any campaign event',
  ],
  whatToBring: ['Valid photo ID', 'Proof of residency', 'Social Security number'],
};

// Polling Locations
export const pollingLocations = [
  {
    id: 'sf-city-hall',
    name: 'SF City Hall',
    address: '400 Van Ness Ave, San Francisco, CA 94102',
    lat: 37.7793,
    lng: -122.4193,
    hours: '7:00 AM - 8:00 PM',
    accessibility: 'Wheelchair accessible, parking available',
    media: 'https://server.trypinnacle.app/storage/v1/object/public/pinnacle-public-assets/ARC/ascend/polling-sf-city-hall.png',
  },
  {
    id: 'sf-main-library',
    name: 'San Francisco Main Library',
    address: '100 Larkin St, San Francisco, CA 94102',
    lat: 37.7795,
    lng: -122.4158,
    hours: '7:00 AM - 8:00 PM',
    accessibility: 'Wheelchair accessible, public transit nearby',
    media:
      'https://server.trypinnacle.app/storage/v1/object/public/pinnacle-public-assets/ARC/ascend/polling-sf-main-library.png',
  },
  {
    id: 'ferry-building',
    name: 'Ferry Building Voting Center',
    address: '1 Ferry Building, San Francisco, CA 94111',
    lat: 37.7956,
    lng: -122.3935,
    hours: '7:00 AM - 8:00 PM',
    accessibility: 'Wheelchair accessible, waterfront location',
    media: 'https://server.trypinnacle.app/storage/v1/object/public/pinnacle-public-assets/ARC/ascend/polling-ferry-building.png',
  },
  {
    id: 'civic-center',
    name: 'Civic Center Community Room',
    address: '355 McAllister St, San Francisco, CA 94102',
    lat: 37.7814,
    lng: -122.4186,
    hours: '7:00 AM - 8:00 PM',
    accessibility: 'Wheelchair accessible, multilingual staff',
    media: 'https://server.trypinnacle.app/storage/v1/object/public/pinnacle-public-assets/ARC/ascend/polling-civic-center.png',
  },
];
