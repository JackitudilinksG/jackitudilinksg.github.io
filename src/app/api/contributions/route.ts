import { NextResponse } from 'next/server';

export async function GET() {
    const query = JSON.stringify({
        query: `{
            user(login: "${process.env.GITHUB_USERNAME}") {
                contributionsCollection {
                    contributionCalendar {
                        totalContributions
                        weeks {
                            contributionDays {
                                contributionCount
                                date
                            }
                        }
                    }
                }
            }
        }`
    });

    try {
        const response = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
                'Content-Type': 'application/json',
                'User-Agent': 'NextJS-Server'
            },
            body: query,
        });

        const data = await response.json();

        if (data.errors) {
            return NextResponse.json({ error: 'GitHub API error', details: data.errors }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (err: any) {
        return NextResponse.json({ error: 'Internal Server Error', message: err.message }, { status: 500 });
    }
}