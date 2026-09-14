import Link from 'next/link';
import SiteFrame from '@/components/site-frame';
import PageHeading from '@/components/page-heading';
import { allBlogItems } from '@/data/site';
import { ArrowRightIcon, CalendarIcon } from '@/components/icons';

export default function BlogPage() {
  return (
    <SiteFrame>
      <div className="content-column inner-page">
        <PageHeading eyebrow="Notes & essays" title="Blog">
          <p>A home for product observations, engineering notes, essays, experiments, and anything else worth writing down.</p>
        </PageHeading>

        <section className="blog-list full-blog-list">
          {allBlogItems.map((post) => (
            <article className="blog-row" key={post.title}>
              <div className="blog-main">
                <h2><Link href={post.href} data-sound="interaction.tap" data-sound-volume="0.85">{post.title}</Link></h2>
                <p>{post.description}</p>
                <div className="blog-date"><CalendarIcon /><span>{post.date}</span></div>
              </div>
              <Link className="read-more" href={post.href} data-sound="interaction.tap" data-sound-volume="0.95">Read more <ArrowRightIcon /></Link>
            </article>
          ))}
        </section>
      </div>
    </SiteFrame>
  );
}
