import { NextResponse } from 'next/server';

const THM_USERNAME = 'aryaman007';
const THM_TOP_PERCENTAGE = 5;
const THM_BASE_STREAK = 376;
const THM_BASE_STREAK_DATE_UTC = Date.UTC(2026, 7, 7);
const INDIA_OFFSET_MS = 5.5 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

function getCalculatedStreak(now = new Date()) {
  const currentIndiaDay = Math.floor((now.getTime() + INDIA_OFFSET_MS) / DAY_MS);
  const baseIndiaDay = Math.floor(THM_BASE_STREAK_DATE_UTC / DAY_MS);

  return THM_BASE_STREAK + Math.max(0, currentIndiaDay - baseIndiaDay);
}

function normalizeStats(data: Record<string, unknown> = {}) {
  const calculatedStreak = getCalculatedStreak();
  const apiStreak = Number(data.streak);
  const rank = Number(data.rank);

  return {
    ...data,
    username: data.username || THM_USERNAME,
    rank: Number.isFinite(rank) && rank > 0 ? rank : null,
    streak: Number.isFinite(apiStreak)
      ? Math.max(apiStreak, calculatedStreak)
      : calculatedStreak,
    topPercentage: THM_TOP_PERCENTAGE,
  };
}

export async function GET() {
  try {
    const response = await fetch(
      `https://tryhackme.com/api/v2/public-profile?username=${THM_USERNAME}`,
      { next: { revalidate: 3600 } },
    );

    if (!response.ok) {
      throw new Error(`TryHackMe API returned ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      source: 'api',
      thm: normalizeStats(data.data),
    });
  } catch (error) {
    console.error('TryHackMe API unavailable; using calculated stats:', error);

    return NextResponse.json({
      success: true,
      source: 'fallback',
      thm: normalizeStats(),
    });
  }
}
