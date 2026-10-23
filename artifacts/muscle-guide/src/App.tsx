import { useMemo, useState } from 'react';
import { ArrowUpLeft, Dumbbell, MoveUpLeft, Target } from 'lucide-react';
import {
  equipmentDescriptions,
  equipmentImages,
  muscleLabels,
  muscles,
  regions,
} from './data';

type Side = 'front' | 'back';

function App() {
  const [side, setSide] = useState<Side>('front');
  const [selected, setSelected] = useState<string | null>('chest');
  const list = useMemo(() => Object.entries(muscles), []);
  const detail = selected ? muscles[selected] : null;
  const image = selected ? equipmentImages[selected] : '';
  const description = selected ? equipmentDescriptions[selected] : '';

  const goToMap = () => document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' });
  const selectMuscle = (id: string) => {
    setSelected(id);
    if (!regions[side].some((region) => region.id === id)) {
      setSide(regions.front.some((region) => region.id === id) ? 'front' : 'back');
    }
  };
  const changeSide = (nextSide: Side) => {
    setSide(nextSide);
    if (!regions[nextSide].some((region) => region.id === selected)) {
      setSelected(regions[nextSide][0]?.id ?? null);
    }
  };

  return (
    <div className="app-shell" dir="rtl" lang="ar">
      <header className="topbar" data-testid="site-header">
        <a className="brand" href="#home" data-testid="link-home" aria-label="دليل عضلات الجسم، الرئيسية">
          <span className="brand-mark" aria-hidden="true">ع</span>
          <span className="brand-name">دليل عضلات الجسم</span>
        </a>
        <nav className="topnav" aria-label="التنقل الرئيسي">
          <a href="#home" data-testid="link-navigation-home">الرئيسية</a>
          <a href="#explore" data-testid="link-navigation-map">خريطة العضلات</a>
          <button className="nav-action" type="button" onClick={goToMap} data-testid="button-nav-explore">
            ابدأ الاستكشاف
          </button>
        </nav>
      </header>

      <section className="hero" id="home" aria-labelledby="hero-title" data-testid="section-intro">
        <div className="hero-inner">
          <div className="eyebrow">مرشدك العملي في النادي</div>
          <h1 id="hero-title">افهم عضلتك.<br /><span>اختر حركتك.</span></h1>
          <p className="hero-copy">
            خريطة تشريحية تفاعلية تربط كل عضلة بتمرينها والجهاز المناسب لها — مع خطوات واضحة تساعدك على أداء الحركة بثقة.
          </p>
          <div className="hero-actions">
            <button className="explore-button" type="button" onClick={goToMap} data-testid="button-explore">
              استكشف الخريطة <MoveUpLeft aria-hidden="true" />
            </button>
            <span className="hero-note">{list.length.toLocaleString('ar-EG')} عضلة · شرح عربي · خريطة أمامية وخلفية</span>
          </div>
        </div>
        <span className="hero-index" aria-hidden="true">الحركة تبدأ من المعرفة&nbsp; / &nbsp;٠١</span>
      </section>

      <main className="explore-section" id="explore" data-testid="section-explorer">
        <div className="section-heading">
          <div>
            <p className="section-kicker">خريطة الجسم التفاعلية</p>
            <h2>اختر منطقة، وابدأ التمرين</h2>
          </div>
          <p>المس العضلة على الرسم أو اختر اسمها من القائمة. سنعرض لك تمريناً مناسباً وكيفية أدائه والجهاز الذي تحتاجه.</p>
        </div>

        <div className="workspace">
          <section className="map-panel" aria-label="خريطة العضلات" data-testid="panel-anatomy-map">
            <div className="map-top">
              <h3>خريطة العضلات</h3>
              <span className="map-count">{list.length.toLocaleString('ar-EG')} منطقة قابلة للاختيار</span>
            </div>
            <div className="view-tabs" role="group" aria-label="اختيار اتجاه الجسم">
              <button type="button" onClick={() => changeSide('front')} aria-pressed={side === 'front'} data-testid="button-view-front">أمامي</button>
              <button type="button" onClick={() => changeSide('back')} aria-pressed={side === 'back'} data-testid="button-view-back">خلفي</button>
            </div>
            <div className="anatomy-plate">
              <svg
                className="anatomy-svg"
                viewBox="0 0 1024 1536"
                role="group"
                aria-label={`الخريطة التشريحية، منظر ${side === 'front' ? 'أمامي' : 'خلفي'}`}
                data-testid={`map-svg-${side}`}
              >
                <image href={side === 'front' ? '/body-front.jpg' : '/body-back.jpg'} x="0" y="0" width="1024" height="1536" preserveAspectRatio="none" />
                {regions[side].map(({ id, d }, index) => (
                  <path
                    key={`${side}-${id}-${index}`}
                    className={`region${selected === id ? ' is-selected' : ''}`}
                    d={d}
                    tabIndex={0}
                    role="button"
                    aria-label={`اختيار عضلة ${muscleLabels[id]}`}
                    aria-pressed={selected === id}
                    onClick={() => selectMuscle(id)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        selectMuscle(id);
                      }
                    }}
                    data-testid={`map-region-${side}-${id}-${index}`}
                  />
                ))}
              </svg>
            </div>
            <p className="map-hint">اختر المنطقة مباشرة على الرسم، أو استخدم أسماء العضلات أدناه</p>
            <div className="muscle-shortcuts" aria-label="قائمة العضلات">
              {list.map(([id, item]) => (
                <button
                  type="button"
                  className="muscle-chip"
                  key={id}
                  onClick={() => selectMuscle(id)}
                  aria-pressed={selected === id}
                  data-testid={`button-muscle-${id}`}
                >
                  {item.n}
                </button>
              ))}
            </div>
          </section>

          <section className="detail-panel" aria-live="polite" aria-atomic="true" data-testid="panel-muscle-detail">
            {detail && selected ? (
              <article className="detail-card" key={selected} data-testid={`card-muscle-${selected}`}>
                <header className="detail-header">
                  <div className="detail-meta">
                    <span>دليل العضلات / {side === 'front' ? 'الجزء الأمامي' : 'الجزء الخلفي'}</span>
                    <span>عضلة {detail.n}</span>
                  </div>
                  <h2 data-testid={`text-muscle-name-${selected}`}>{detail.n}</h2>
                  <p className="exercise-name" data-testid={`text-exercise-${selected}`}>{detail.ex}</p>
                </header>
                <div className="detail-body">
                  <div className="equipment-card" data-testid={`equipment-card-${selected}`}>
                    <img src={image} alt={`صورة جهاز ${detail.m}`} loading="lazy" data-testid={`img-equipment-${selected}`} />
                    <div>
                      <p className="equipment-label">الجهاز / الأداة المناسبة</p>
                      <h3>{detail.m}</h3>
                      <p className="equipment-desc">{description}</p>
                    </div>
                  </div>
                  <div className="movement-card" data-testid={`movement-card-${selected}`}>
                    <div className="movement-copy">
                      <small>مسار الحركة</small>
                      <strong>العضلة المستهدفة: {detail.n}</strong>
                      <p>شاهد الحركة المناسبة لهذا التمرين، وتبقى العضلة نفسها مميزة على الخريطة.</p>
                    </div>
                    <img
                      className="motion-graphic"
                      src={`/movements/${selected}.svg`}
                      alt={`رسم متحرك لطريقة تمرين ${detail.ex}`}
                      width={240}
                      height={240}
                      data-testid={`motion-scene-${selected}`}
                    />
                  </div>
                  <h3 className="steps-title"><span className="step-number">١</span>طريقة الأداء</h3>
                  <ol className="steps-list" data-testid={`list-steps-${selected}`}>
                    {detail.s.map((step, index) => <li key={`${selected}-${index}`}>{step}</li>)}
                  </ol>
                  <div className="tip-box" role="note" data-testid={`tip-${selected}`}>
                    <span className="tip-icon" aria-hidden="true">!</span>
                    <p><strong>تنبيه الأداء</strong><br />{detail.t}</p>
                  </div>
                  <p className="alternative" data-testid={`alternative-${selected}`}>
                    <strong>بديل مناسب:</strong> {detail.alt.replace(/^بديل:\s*/, '')}
                  </p>
                </div>
              </article>
            ) : (
              <div className="empty-state" data-testid="empty-muscle-state">
                <div>
                  <div className="empty-icon"><Target aria-hidden="true" /></div>
                  <h3>اختر عضلة من الخريطة</h3>
                  <p>اضغط على المنطقة التي تريد تدريبها لتظهر الحركة والجهاز المناسب وخطوات الأداء.</p>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      <footer className="footer" data-testid="site-footer">
        <span className="footer-brand"><Dumbbell aria-hidden="true" size={17} /> دليل عضلات الجسم</span>
        <span>تعلّم الحركة الصحيحة، وتمرّن بوعي.</span>
        <a href="#home" data-testid="link-back-top" aria-label="العودة إلى بداية الصفحة"><ArrowUpLeft size={17} aria-hidden="true" /> إلى الأعلى</a>
      </footer>
    </div>
  );
}

export default App;
