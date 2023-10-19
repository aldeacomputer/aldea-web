declare global {
  interface DevExample {
    title: string;
    description: string;
    src: string;
    lang: string;
  }

  interface NavLink {
    text: string;
    link: string;
  }

  interface NavParent {
    text: string;
    children: NavTree
  }

  type NavTree = Array<NavLink | NavParent>

  interface PageSection {
    id: string;
    name: string;
  }

  interface PerformanceRow {
    name: string;
    tps: string;
    vs: string;
  }

  interface SocialLink {
    icon: any;
    url: string;
  }

  interface TeamMember {
    image: string;
    name: string;
    role: string;
  }

  interface TimelineItem {
    icon: any;
    year: number;
    description: string;
  }

  interface Usecase {
    image: string;
    title: string;
    description: string;
  }

  interface Window {
    Tally: any;
  }
}


export {}
