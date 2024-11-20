private updateVerticalNav() {
  const urlParts = this.currentUrl().split('/');
  // Check for v2 and adjust rootSection accordingly
  const rootSection = urlParts[1] === 'v2' ? urlParts[2] : urlParts[1];

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

// Also update getSectionSideNav to handle v2
private getSectionSideNav(sectionRoot: string): NavItem[] {
  const navSection = this.navigationSignal().find(item =>
    item.path.includes(sectionRoot) ||
    item.children?.some(child => child.path.includes(sectionRoot))
  );

  return navSection?.children?.filter(child =>
    child.displayType.includes('vertical')
  ) ?? [];
}


// just adding testing

// testing 2
