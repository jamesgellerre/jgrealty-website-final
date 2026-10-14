import { PAST_SALES } from './constants';
import type { Property } from './types';

export const SITE_URL = 'https://www.jamesgellerrealty.com';
export const SITE_NAME = 'James Geller Realty';

export const AGENT = {
  name: 'James Geller',
  brokerage: 'The ONE Luxury Properties',
  dre: '02154616',
  phoneDisplay: '818-515-8391',
  phoneE164: '+1-818-515-8391',
  phoneTel: '+18185158391',
  email: 'jamesgellerRE@gmail.com',
  street: '2535 Townsgate Rd Ste 109',
  city: 'Westlake Village',
  region: 'CA',
  postalCode: '91361',
  instagram: 'https://www.instagram.com/jamesgeller.realty',
  instagramHandle: '@jamesgeller.realty',
} as const;

export const SERVICE_CITIES = [
  'Thousand Oaks',
  'Westlake Village',
  'Agoura Hills',
  'Calabasas',
  'Oak Park',
  'Newbury Park',
  'Simi Valley',
  'Moorpark',
  'Woodland Hills',
  'Encino',
  'Sherman Oaks',
  'Studio City',
] as const;

export const HOME_DESCRIPTION =
  'James Geller is a broker-associate at The ONE Luxury Properties (DRE# 02154616) serving buyers and sellers in the Conejo Valley and San Fernando Valley.';

export const SALES_DESCRIPTION =
  'Past sales by James Geller, broker-associate at The ONE Luxury Properties (DRE# 02154616), across the Conejo Valley and San Fernando Valley.';

export const BIO_PARAGRAPHS = [
  'Born and raised in the heart of the San Fernando Valley, James has a deep understanding of the Los Angeles real estate market. He proudly serves clients throughout the San Fernando Valley, Conejo Valley, and the greater Los Angeles area.',
  "Since becoming a licensed broker in 2022, James has worked closely with investors across Southern California, honing his ability to identify opportunities that maximize value—whether it's a first-time home purchase or a strategic investment.",
  'James is committed to providing a seamless experience with clear, transparent communication, ensuring his clients feel confident and informed every step of the way.',
  "Whether you're searching for your next home, investment property, or a free home evaluation, get in touch with James today.",
] as const;

export function isSalesPath(pathname: string) {
  const path = pathname.split('?')[0].replace(/\/+$/, '') || '/';
  return path === '/sales';
}

export function listingAlt(property: Pick<Property, 'address' | 'city' | 'beds' | 'baths' | 'sqft' | 'imageUrl'>) {
  const view = property.imageUrl?.includes('aerial') ? 'Aerial view of' : 'Home at';
  return `${view} ${property.address}, ${property.city}. ${property.beds} bedrooms, ${property.baths} bathrooms, ${property.sqft.toLocaleString()} square feet.`;
}

export function serviceCitySentence() {
  const cities = [...SERVICE_CITIES];
  const last = cities.pop();
  return `Serving ${cities.join(', ')}, and ${last}.`;
}

export function structuredData() {
  const agent = {
    '@type': 'RealEstateAgent',
    '@id': `${SITE_URL}/#agent`,
    name: AGENT.name,
    url: `${SITE_URL}/`,
    image: `${SITE_URL}/james-headshot.webp`,
    telephone: AGENT.phoneE164,
    email: AGENT.email,
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'DRE',
      value: AGENT.dre,
    },
    memberOf: {
      '@type': 'Organization',
      name: AGENT.brokerage,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: AGENT.street,
      addressLocality: AGENT.city,
      addressRegion: AGENT.region,
      postalCode: AGENT.postalCode,
      addressCountry: 'US',
    },
    sameAs: [AGENT.instagram],
    areaServed: SERVICE_CITIES.map((name) => ({
      '@type': 'Place',
      name,
    })),
    description: BIO_PARAGRAPHS.join(' '),
  };

  const sales = {
    '@type': 'ItemList',
    '@id': `${SITE_URL}/sales#sales`,
    name: 'Past sales',
    numberOfItems: PAST_SALES.length,
    itemListElement: PAST_SALES.map((property, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Accommodation',
        name: `${property.address}, ${property.city}`,
        url: `${SITE_URL}/sales`,
        image: `${SITE_URL}${property.imageUrl}`,
        address: {
          '@type': 'PostalAddress',
          streetAddress: property.address,
          addressLocality: property.city,
          addressRegion: 'CA',
          addressCountry: 'US',
        },
        numberOfBedrooms: property.beds,
        numberOfBathroomsTotal: property.baths,
        floorSize: {
          '@type': 'QuantitativeValue',
          value: property.sqft,
          unitCode: 'FTK',
          unitText: 'sq ft',
        },
        description: [
          `Sold for ${property.price}.`,
          property.representation,
          property.lotSize,
        ].filter(Boolean).join(' '),
      },
    })),
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: `${SITE_URL}/`,
      },
      agent,
      sales,
    ],
  };
}

export function jsonLdScript() {
  return JSON.stringify(structuredData()).replace(/</g, '\\u003c');
}

export function llmsText() {
  const sales = PAST_SALES.map((property) => {
    const facts = [
      `${property.address}, ${property.city}`,
      property.price,
      `${property.beds} bed`,
      `${property.baths} bath`,
      `${property.sqft.toLocaleString()} sq ft`,
    ];
    if (property.lotSize) facts.push(property.lotSize);
    if (property.representation) facts.push(property.representation);
    return `- ${facts.join(' — ')}`;
  }).join('\n');

  return `# ${SITE_NAME}

> ${HOME_DESCRIPTION}

James Geller is a licensed broker-associate with ${AGENT.brokerage} (DRE# ${AGENT.dre}).

## Contact

- Name: ${AGENT.name}
- Brokerage: ${AGENT.brokerage}
- License: DRE# ${AGENT.dre}
- Phone: ${AGENT.phoneE164}
- Email: ${AGENT.email}
- Office: ${AGENT.street}, ${AGENT.city}, ${AGENT.region} ${AGENT.postalCode}
- Instagram: ${AGENT.instagram}

## Service areas

Conejo Valley and San Fernando Valley, including ${SERVICE_CITIES.join(', ')}.

## About

${BIO_PARAGRAPHS.join('\n\n')}

## Pages

- [Home](${SITE_URL}/)
- [Past sales](${SITE_URL}/sales)

## Past sales

${sales}
`;
}
