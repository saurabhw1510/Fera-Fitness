# FERA FITNESS

The seven-page FERA Fitness website uses Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and Lucide. Start it with `npm ci` and `npm run dev`, then open http://localhost:3000. Run `npm run build` to generate the production files in `out/`.

[Site configuration](lib/site.ts) holds contact details, opening hours, program text, coach profiles, membership options, testimonials, gallery media, and the hero video. Set `canonicalOrigin` to the final public origin before deploying to enable canonical URLs and absolute social preview images.

Membership and contact inquiries open a prefilled message for the owner’s supplied WhatsApp number. The visitor sends it in WhatsApp. The public phone number, address, and hours come from the [Google Business listing](https://www.google.com/maps?cid=12070268988260088979).

## Asset map

| File in `public/media` | Dimensions | Use |
| --- | --- | --- |
| `video-2.jpg` | 243 × 174 | Supplied sparring still for MMA, the studio preview, and the gallery |
| `image-2.jpg` | 243 × 406 | Supplied mace-training photo for the homepage introduction and gallery |
| `image-3.jpg` | 243 × 406 | Supplied kettlebell photo for Fitness Foundations and the gallery |
| `unnamed.jpg` | 243 × 406 | Supplied strength-training photo for membership and the gallery |
| `partner-strength.webp` | 834 × 1250 | Google listing photo for Strength & Conditioning and the gallery |
| `fera-community.webp` | 900 × 1200 | Google listing photo for the homepage, About, and gallery |
| `group-conditioning.mp4` and `group-conditioning-poster.webp` | 576 × 1024 | Google listing clip and poster for the gallery |
| `training-montage.mp4` and `dumbbell-conditioning-poster.webp` | 832 × 464 | Google listing montage and poster for the gallery |
| `hero-training.mp4` and `hero-training.webp` | 832 × 464 | Short silent cut and fallback image from the same montage for the homepage |

Coaching profiles, membership rates, and Instagram are editable once the studio supplies the details.
