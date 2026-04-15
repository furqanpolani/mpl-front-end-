import data from './mpl-data.json';

const d = data as any;

export const mockApi = {
  getSports: () => d.sports ?? [],

  getHero: () => d.hero ?? { headline: 'MPL T20 Championship — Season 1', liveFixtures: [], upcomingFixtures: [], latestAnnouncements: [] },

  getAnnouncements: () => d.announcements ?? [],

  getArchive: () => d.archive ?? [],

  getUpcomingEvents: () => d.upcomingEvents ?? [],

  getMarketplaceTeams: () => d.marketplaceTeams ?? [],

  getCricketTournaments: () => d.cricketTournaments ?? [],

  getTournamentsBySport: (sportId: string) =>
    (d.cricketTournaments ?? []).filter((t: any) => t.sportId === sportId || t.sport?.id === sportId),

  getTournamentById: (id: string) =>
    d.tournamentData?.[`tournament_${id}`] ?? null,

  getFixturesByTournament: (tournamentId: string) =>
    d.tournamentData?.[`fixtures_${tournamentId}`] ?? { upcoming: [], live: [], completed: [] },

  getPointsTable: (tournamentId: string) =>
    d.tournamentData?.[`points_table_${tournamentId}`] ?? [],

  getScorecard: (fixtureId: string) =>
    d.scorecards?.[fixtureId] ?? null,

  getSportBySlug: (slug: string) =>
    (d.sports ?? []).find((s: any) => s.slug === slug) ?? null,

  getTournamentsBySportSlug: (slug: string) => {
    const sport = (d.sports ?? []).find((s: any) => s.slug === slug);
    if (!sport) return [];
    return (d.cricketTournaments ?? []).filter((t: any) => t.sportId === sport.id || t.sport?.id === sport.id);
  },
};
