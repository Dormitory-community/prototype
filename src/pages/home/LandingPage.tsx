"use client"

import type React from "react"
import { Hero } from "../../components/home/Hero.tsx"
import { Features } from "../../components/home/Features.tsx"
import { Stats } from "../../components/home/Stats.tsx"
import { CTA } from "../../components/home/CTA.tsx"

const LandingPage: React.FC = () => {


    return (
        <>
            <Hero />
            <Features />
            <Stats />
            <CTA />
        </>
    )
}

export default LandingPage
