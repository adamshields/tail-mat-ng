@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private config = inject(APP_CONFIG_TOKEN);
  private navigationSignal = signal<NavItem[]>(this.config.navigation);
  private currentUrl = signal<string>('');
  private verticalNavItems = signal<NavItem[]>([]);

  private router = inject(Router);

  // Define base path logic
  private readonly BASE_PATH = '/v2'; // Adjust this as needed

  constructor() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
      this.currentUrl.set((event as NavigationEnd).url);
      this.updateVerticalNav();
    });
  }

  /**
   * Returns horizontal navigation items with computed dropdown states
   */
  getHorizontalNav = computed(() =>
    this.navigationSignal()
      .filter((item) => item.displayType.includes('horizontal'))
      .map((item) => ({
        ...item,
        path: this.getFullPath(item.path),
        hasDropdown: item.children?.some((child) => !child.displayType.includes('vertical')) ?? false,
        dropdownItems: item.children?.map((child) => ({
          ...child,
          path: this.getFullPath(child.path),
        })) ?? [],
      }))
  );

  /**
   * Returns current vertical navigation items
   */
  getVerticalNav = computed(() => this.verticalNavItems());

  /**
   * Updates vertical navigation based on current URL
   */
  private updateVerticalNav() {
    const urlParts = this.currentUrl().split('/');
    const rootSection = urlParts[1];

    if (rootSection === 'applications') {
      if (urlParts[3] === 'designs' && urlParts.length >= 5) {
        const designItems = this.getDesignDetailsSideNav(urlParts[2], urlParts[4]);
        this.verticalNavItems.set(designItems);
        return;
      }
      this.verticalNavItems.set([]);
      return;
    }

    const sideNavItems = this.getSectionSideNav(rootSection);
    this.verticalNavItems.set(sideNavItems);
  }

  /**
   * Gets navigation items for design details view
   */
  private getDesignDetailsSideNav(appId: string, designId: string): NavItem[] {
    const appSection = this.navigationSignal().find(
      (item) => this.getFullPath(item.path) === `${this.BASE_PATH}/applications`
    );
    const designNavItems =
      appSection?.children?.find((item) => item.path.includes('/designs'))?.children ?? [];

    return designNavItems.map((item) => ({
      ...item,
      path: this.getFullPath(item.path)
        .replace(':appId', appId)
        .replace(':designId', designId),
    }));
  }

  /**
   * Gets vertical navigation items for a given section
   */
  private getSectionSideNav(sectionRoot: string): NavItem[] {
    const navSection = this.navigationSignal().find(
      (item) =>
        this.getFullPath(item.path).includes(`${this.BASE_PATH}/${sectionRoot}`) ||
        item.children?.some((child) =>
          this.getFullPath(child.path).includes(`${this.BASE_PATH}/${sectionRoot}`)
        )
    );

    return (
      navSection?.children?.map((child) => ({
        ...child,
        path: this.getFullPath(child.path),
      })) ?? []
    );
  }

  /**
   * Appends the base path to the navigation path
   * @param path - Path from the navigation config
   * @returns Full path with base path
   */
  private getFullPath(path: string): string {
    return `${this.BASE_PATH}${path.startsWith('/') ? path : `/${path}`}`;
  }
}
