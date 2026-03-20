'use client';
import { useEffect, useState } from 'react';
import styles from '../styles/GitHubContributions.module.css';

interface ContributionDay {
    date: string;
    contributionCount: number;
}

interface Week {
    contributionDays: ContributionDay[];
}

interface Calendar {
    totalContributions: number;
    weeks: Week[];
}

function getLevelClass(count: number): string {
    if (count === 0) return styles.level0;
    if (count < 3)   return styles.level1;
    if (count < 6)   return styles.level2;
    if (count < 9)   return styles.level3;
    return styles.level4;
}

export default function GitHubContributions() {
    const [calendar, setCalendar] = useState<Calendar | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('/api/contributions')
            .then(res => res.json())
            .then(data => {
                const cal = data?.data?.user?.contributionsCollection?.contributionCalendar;
                if (cal) setCalendar(cal);
                else setError('Failed to load contributions');
            })
            .catch(() => setError('Failed to fetch contributions'));
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.graphScroll}>
                <div className={styles.graph}>
                    {calendar && calendar.weeks.map((week, wi) =>
                        week.contributionDays.map((day, di) => (
                            <div
                                key={`${wi}-${di}`}
                                className={`${styles.sq} ${getLevelClass(day.contributionCount)}`}
                                title={`${day.date}: ${day.contributionCount} commits`}
                            />
                        ))
                    )}
                </div>
            </div>
            {error && <p>{error}</p>}
            <div className={styles.legend}>
                <span>Less</span>
                <div className={`${styles.sq} ${styles.level0}`}></div>
                <div className={`${styles.sq} ${styles.level1}`}></div>
                <div className={`${styles.sq} ${styles.level2}`}></div>
                <div className={`${styles.sq} ${styles.level3}`}></div>
                <div className={`${styles.sq} ${styles.level4}`}></div>
                <span>More</span>
            </div>
        </div>
    );
}