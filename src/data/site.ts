import type { IconName } from './icons';

export const SITE_NAME = 'SIJP – Seattle IT Japanese Professionals';
export const BRAND = 'Seattle IT Japanese Professionals';
export const DEFAULT_DESCRIPTION =
  'SIJP (Seattle IT Japanese Professionals) はシアトルを基盤として活動する IT プロフェッショナルの NPO です。';
export const FACEBOOK_URL = 'https://www.facebook.com/SeattleItJapaneseProfessionals/';
export const COPYRIGHT_YEAR = new Date().getFullYear();

export const footerLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy/' },
  { label: 'Contact us', href: '/contact-us/' },
];

export const activities: { title: string; icon: IconName; href?: string }[] = [
  { title: 'Education<br> For Children', icon: 'laptop_mac' },
  { title: 'IT Professional<br> Meetup', icon: 'groups' },
  { title: 'Student<br> Division', icon: 'school' },
];

export const joinRows: {
  title: string; text: string; href: string; external?: boolean;
}[] = [
  {
    title: 'Join Events',
    text: 'SIJPではシアトルを中心に様々なイベントを開催しています。私たちはITを通してみんながワクワクするようなイベントをお届けします。',
    href: FACEBOOK_URL, external: true,
  },
  {
    title: 'Become a Staff Member',
    text: 'ITに情熱を持ってる方、ITでつながって一緒に未来を創っていきたい方、自身の培ってきた専門知識を社会に還元していきたい方、学びを深めたい方、SIJPと一緒に活動しませんか。',
    href: '/staff/',
  },
  {
    title: 'Join Student Division',
    text: 'シアトルにいるからこそ、経験できることがここにはあります。ITプロフェッショナルズや他の仲間たちと共に、新たな世界を見てみませんか？',
    href: '/student-division/',
  },
];
