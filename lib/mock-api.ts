/**
 * Mock API — serves static JSON data for demo mode (no backend required).
 * All data was exported from the live database.
 */
import data from './mpl-data.json';

const d = data as any;

export const mockApi = {
  getSports: () => d.sports ?? [],

  getHero: () => d.hero ?? { headline: 'MPL T20 Championship — Season 1', liveFixtures: [], upcomingFixtures: [], latestAnnouncements: [] },

  getAnnouncements: () => d.announcements ?? [],

  getArchive: () => d.archive ?? [],

  getUpcomingEvents: () => d.upcomingEvents ?? [],

  getMarketplaceTeams: () => d.marketplaceTeams ?? [],

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

  // Find tournament by sport slug
  getTournamentsBySportSlug: (slug: string) => {
    const sport = (d.sports ?? []).find((s: any) => s.slug === slug);
    if (!sport) return [];
    return (d.cricketTournaments ?? []).filter((t: any) => t.sportId === sport.id || t.sport?.id === sport.id);
  },

  getSportBySlug: (slug: string) =>
    (d.sports ?? []).find((s: any) => s.slug === slug) ?? null,

  // Get all fixtures across all tournaments for hero
  getAllFixtures: () => {
    const all: any[] = [];
    Object.entries(d.tournamentData ?? {}).forEach(([key, val]: any) => {
      if (key.startsWith('fixtures_')) {
        all.push(...(val.upcoming ?? []), ...(val.live ?? []), ...(val.completed ?? []));
      }
    });
    return all;
  },
};
