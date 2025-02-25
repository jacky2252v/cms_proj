'use client'

import LanguageSelector from '@/components/LanguageSelector/LanguageSelector';
import { MongoDBCredentialsForm } from '@/components/MongoDBConnection/MongoDBConnection';
import { use } from 'react';

export default function Connection({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    if (slug === "language") {
        return (
            <main className="min-h-screen flex items-center justify-center p-4">
                <LanguageSelector />
            </main>
        );
    } else if (slug === "connection") {
        return (
            <main className="min-h-screen flex items-center justify-center p-4">
                <MongoDBCredentialsForm />
            </main>
        );
    }
    return null;
}