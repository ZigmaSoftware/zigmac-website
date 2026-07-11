import { useState, useEffect } from 'react';
import { ChevronRight, Shield, AlertTriangle, Info, CheckCircle, Mail, MapPin, Book, Users, Lock } from 'lucide-react';
import Header from "@/components/Header";
import Footer from '@/components/Footer';

const Policies = () => {
  const [activeSection, setActiveSection] = useState('introduction');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let frameId = 0;

    const handleScroll = () => {
      if (frameId) return;

      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
      setScrollProgress(scrolled);

      const sections = document.querySelectorAll<HTMLElement>('.policy-section');
      let current = 'introduction';
      
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 150) {
          current = section.id || 'introduction';
        }
      });
      
      setActiveSection(current);
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 140;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const top = elementPosition - offset;

      if (window.__lenis) {
        window.__lenis.scrollTo(top, { duration: 0.9 });
        return;
      }

      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="policy-container">
      {/* Scroll Progress Bar */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      <Header />

      {/* Header */}
      <header className="policy-header">
        <div className="policy-header-content">
          <div className="policy-company-badge">
            <Lock size={15} />
            Compliance &amp; Governance
          </div>
          <h1>Anti-Bribery &amp; Corruption Policy</h1>
          <div className="policy-meta">
            <div className="policy-meta-item">
              <span className="policy-meta-dot" />
              Last Updated: February 26, 2024
            </div>
            <div className="policy-meta-item">
              <span className="policy-meta-dot" />
              Zero Tolerance Approach
            </div>
            <div className="policy-meta-item">
              <span className="policy-meta-dot" />
              Global Compliance Standards
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="policy-nav-bar">
        <div className="policy-nav-container">
          {[
            { id: 'introduction', label: 'Introduction' },
            { id: 'bribery', label: 'Bribery & Corruption' },
            { id: 'gifts', label: 'Gifts & Hospitality' },
            { id: 'aml', label: 'Anti-Money Laundering' },
            { id: 'vendor', label: 'Vendor Policy' },
            { id: 'sanctions', label: 'Sanctions' }
          ].map(item => (
            <button
              key={item.id}
              className={`policy-nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="policy-main-content">
        {/* Sidebar */}
        <aside className="policy-sidebar">
          <div className="policy-sidebar-card">
            <h3 className="policy-sidebar-title">
              <Book size={18} />
              Quick Navigation
            </h3>
            {[
              { label: 'Zero Tolerance Approach', href: 'introduction' },
              { label: 'Policy Scope', href: 'scope' },
              { label: 'Key Definitions', href: 'definitions' },
              { label: 'Compliance Requirements', href: 'compliance' },
              { label: 'Reporting Violations', href: 'reporting' },
              { label: 'Consequences & Monitoring', href: 'consequences' }
            ].map(link => (
              <a
                key={link.href}
                className="policy-sidebar-link"
                onClick={() => scrollToSection(link.href)}
              >
                <ChevronRight size={14} />
                {link.label}
              </a>
            ))}
          </div>

          <div className="policy-sidebar-card policy-contact-info">
            <h4>
              <Users size={16} style={{ marginRight: '0.5rem', display: 'inline' }} />
              Contact
            </h4>
            <p><strong>Dhananjay Jitesh Pandey</strong></p>
            <p>Group Head - Secretarial, Compliance and Legal</p>
            <p style={{ marginTop: '1rem' }}>
              <Mail size={14} style={{ display: 'inline' }} />
              {' '}Dhananjay.pandey@blueplanet.com
            </p>
            <p>
              <MapPin size={14} style={{ display: 'inline' }} />
              {' '}New Delhi, India
            </p>
          </div>
        </aside>

        {/* Content Area */}
        <div className="policy-content-area">
          {/* Introduction Section */}
          <section className="policy-section" id="introduction">
            <div className="policy-section-header">
              <div className="policy-section-number">1</div>
              <h2>Introduction</h2>
            </div>

            <PolicyAlert type="warning" icon={<AlertTriangle size={24} />}>
              <strong>⚠️ Zero Tolerance Approach</strong>
              Blue Planet Environmental Solutions Pte Ltd and all its subsidiaries adopt a zero-tolerance approach to bribery and corruption of any form. The Company does not offer, pay, or accept any bribes for any purpose whether directly or through a third party.
            </PolicyAlert>

            <p>Blue Planet Environmental Solutions Pte Ltd and all its subsidiaries, affiliate and group companies are committed to conduct all of its business in a professional, fair, and ethical manner. This policy reflects our ethical business practices on Anti-Bribery and Corruption, Gifting and Hospitality, and Anti-Money Laundering.</p>

            <div className="policy-key-info">
              <h4>Jurisdictions Covered</h4>
              <p>This policy applies to all operations in:</p>
              <ul>
                <li>Singapore</li>
                <li>India</li>
                <li>United Kingdom</li>
                <li>Malaysia</li>
                <li>And all other jurisdictions where the Company operates</li>
              </ul>
            </div>

            <h3 id="scope">Scope of Application</h3>
            <p>This Policy is applicable to all <strong>Covered Persons</strong> including:</p>
            <ul>
              <li>Directors and senior managers</li>
              <li>Officers and employees (permanent, fixed-term, or temporary)</li>
              <li>Consultants, contractors, and trainees</li>
              <li>Interns, seconded staff, and casual workers</li>
              <li>Agency staff and agents</li>
              <li>Any other person associated with the Company</li>
            </ul>

            <PolicyAlert type="info" icon={<Info size={24} />}>
              <strong>📋 Legal Compliance</strong>
              Covered Persons must conduct their activities in full compliance with this Policy and all applicable anti-corruption laws, including the Singapore Corruption Act, Prevention of Corruption Act 1988 (India), UK Bribery Act 2010, US Foreign Corrupt Practices Act, and Malaysian Anti-Corruption Commission Act 2009.
            </PolicyAlert>
          </section>

          {/* Bribery & Corruption Section */}
          <section className="policy-section" id="bribery">
            <div className="policy-section-header">
              <div className="policy-section-number">2</div>
              <h2>Bribery &amp; Corruption</h2>
            </div>

            <h3 id="definitions">What Constitutes a Bribe?</h3>
            <p>A bribe or corrupt action includes the receiving, offering, promising, requesting, authorizing, or providing of a financial or non-financial advantage or &quot;anything of value&quot; to any client, customer, business partner, vendor or other third party in order to secure, induce or keep an improper or unfair advantage or misuse an individual&apos;s position.</p>

            <div className="policy-key-info">
              <h4>&quot;Anything of Value&quot; includes but is not limited to:</h4>
              <ul>
                <li>Cash and cash equivalents</li>
                <li>Gifts and services</li>
                <li>Employment offers</li>
                <li>Loans and travel expenses (except business travel)</li>
                <li>Hospitality (hotel accommodation, food, drinks, entertainment)</li>
                <li>Charitable donations and sponsorships</li>
                <li>Business opportunities and favorable contracts</li>
                <li>Event participation (sporting events, concerts, ceremonies)</li>
              </ul>
            </div>

            <h3>Examples of Bribes</h3>
            <ol>
              <li>Lavish gifts, entertainment or travel expenses, particularly where disproportionate or during business negotiations</li>
              <li>Cash payments by employees or third persons</li>
              <li>Uncompensated use of Company services, facilities or property</li>
              <li>Loans, loan guarantees or extensions of credit</li>
              <li>Providing sub-contracts to persons connected to those awarding main contracts</li>
              <li>Engaging local companies owned by family members of potential customers/officials</li>
              <li>Political or charitable donations linked to business relationships</li>
            </ol>

            <PolicyAlert type="warning" icon={<Shield size={24} />}>
              <strong>🚫 Facilitation Payments Strictly Prohibited</strong>
              Any irregular one-time and/or routine payments made to government officials to expedite or secure routine governmental action are strictly prohibited. Any such payments must immediately be reported to the Chief Compliance Officer (CCO) or Compliance Officer (CO).
            </PolicyAlert>

            <h3>Government and Public Officials</h3>
            <p>Examples of government and public officials include:</p>
            <ul>
              <li>Anyone holding a legislative, administrative or judicial position</li>
              <li>Government ministers and elected representatives</li>
              <li>Civil servants, magistrates, and judges</li>
              <li>Employees of government departments, agencies, or public enterprises</li>
              <li>Officials of public international organizations (World Bank, UN, European Commission)</li>
            </ul>

            <h3 id="compliance">Compliance Requirements</h3>
            <p>The Chief Compliance Officer (CCO) or Compliance Officer (CO) shall ensure that:</p>
            <ul>
              <li>All records are accurate, complete and accessible for review</li>
              <li>All expenses claims relating to hospitality, gifts or expenses are properly recorded</li>
              <li>No accounts will be kept &quot;off-book&quot;</li>
              <li>Due diligence is undertaken before engaging any third-party</li>
              <li>The Vendor Engagement SOP is properly implemented</li>
            </ul>

            <h3 id="reporting">Reporting Obligations</h3>
            <PolicyAlert type="success" icon={<CheckCircle size={24} />}>
              <strong>✓ Protected Reporting</strong>
              Covered Persons must notify the CCO/CO and legal team as soon as possible if they believe or suspect that a breach of this Policy has occurred or may occur. Employees who report potential misconduct in good faith will be protected against retaliation.
            </PolicyAlert>
          </section>

          {/* Gifts Section */}
          <section className="policy-section" id="gifts">
            <div className="policy-section-header">
              <div className="policy-section-number">3</div>
              <h2>Gifts, Meals, Entertainment &amp; Employment</h2>
            </div>

            <h3>Gift Policy</h3>
            <p>The Company competes for and earns business through the quality of its personnel, products and services, not with gifts or lavish entertainment. Gifts are permitted only when ALL of the following circumstances are met:</p>

            <table className="policy-table">
              <thead>
                <tr>
                  <th>Requirement</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Cash Prohibition</strong></td>
                  <td>No cash or cash equivalent gifts (gift cards, store cards, gambling chips)</td>
                </tr>
                <tr>
                  <td><strong>Legal Compliance</strong></td>
                  <td>Permitted under applicable law and recipient&apos;s employer guidelines</td>
                </tr>
                <tr>
                  <td><strong>Transparency</strong></td>
                  <td>Gift is presented openly with complete transparency</td>
                </tr>
                <tr>
                  <td><strong>Documentation</strong></td>
                  <td>Properly recorded in the Company&apos;s books and records</td>
                </tr>
                <tr>
                  <td><strong>Purpose</strong></td>
                  <td>Provided as token of esteem, courtesy or in return for hospitality</td>
                </tr>
                <tr>
                  <td><strong>Value Limit</strong></td>
                  <td>Must cost less than <strong>INR 8,000</strong> (or foreign currency equivalent)</td>
                </tr>
              </tbody>
            </table>

            <PolicyAlert type="info" icon={<Info size={24} />}>
              <strong>📝 Important Note</strong>
              Gifts exceeding INR 8,000 should be returned immediately and reported to management. If immediate return is not practical, they should be given to the Company for charitable disposition.
            </PolicyAlert>

            <h3>Meals, Entertainment, Travel and Lodging</h3>
            <p>Common sense and moderation should prevail in business entertainment. Expenses may be incurred without prior written approval only if ALL of the following conditions are met:</p>
            <ul>
              <li>The expenses are bona fide and related to a legitimate business purpose</li>
              <li>The cost is reasonable, proportional, and not extravagant</li>
              <li>Permitted by the rules of the recipient&apos;s employer</li>
              <li>Attended by appropriate Company representatives</li>
            </ul>

            <PolicyAlert type="warning" icon={<AlertTriangle size={24} />}>
              <strong>⚠️ Pre-Approval Required</strong>
              Any meal, hospitality, travel or lodging expense greater than INR 8,000 per person must be pre-approved in writing by the CCO or CO.
            </PolicyAlert>

            <h3>Third Party Relationships</h3>
            <p>Anti-corruption laws prohibit indirect payments made through a third party. The Company must:</p>
            <ul>
              <li>Conduct integrity due diligence reviews of third parties</li>
              <li>Insert anti-corruption compliance provisions in contracts</li>
              <li>Require third-party certification of compliance</li>
              <li>Monitor reasonableness and legitimacy of services and compensation</li>
            </ul>
          </section>

          {/* Anti-Money Laundering Section */}
          <section className="policy-section" id="aml">
            <div className="policy-section-header">
              <div className="policy-section-number">4</div>
              <h2>Anti-Money Laundering</h2>
            </div>

            <h3>What is Money Laundering?</h3>
            <p>Money laundering is the process by which offenders disguise the original ownership and control of the proceeds of criminal conduct by making such proceeds appear to have derived from a legitimate source.</p>

            <h3>The Three Components of Money Laundering</h3>

            <div className="policy-key-info">
              <h4>1. Placement</h4>
              <p>Money generated from illegal/criminal activity is disposed of by depositing into financial institutions or converting into negotiable instruments.</p>
            </div>

            <div className="policy-key-info">
              <h4>2. Layering</h4>
              <p>Funds are moved between accounts to hide their origin and separate illegally obtained assets from their original source through complex transactions.</p>
            </div>

            <div className="policy-key-info">
              <h4>3. Integration</h4>
              <p>Illicit funds are reintroduced into the economy and used to purchase legitimate assets, fund businesses, or conduct other criminal activity.</p>
            </div>

            <h3>Red Flags to Report</h3>
            <p>Examples of suspicious activities that should be reported to the CCO include:</p>
            <ul>
              <li>Customer/vendor provides insufficient, false, or suspicious information</li>
              <li>Payment methods not consistent with policy (money orders, traveller&apos;s checks, multiple instruments)</li>
              <li>Multiple negotiable instruments to pay a single invoice</li>
              <li>Requests to pay in cash</li>
              <li>Early repayments from unrelated third parties</li>
              <li>Orders inconsistent with customer&apos;s business</li>
              <li>Payments from countries with high money laundering/terrorist financing risk</li>
              <li>Payments from tax havens or sanctioned jurisdictions</li>
              <li>Overpayments followed by refund requests to third parties</li>
              <li>Unusually complex business structures with no real business purpose</li>
            </ul>

            <PolicyAlert type="warning" icon={<AlertTriangle size={24} />}>
              <strong>🚨 Immediate Reporting Required</strong>
              Any suspicions of criminal conduct, money laundering, or terrorist financing must be reported to the CCO immediately without notifying anyone involved in the transaction.
            </PolicyAlert>
          </section>

          {/* Vendor Policy Section */}
          <section className="policy-section" id="vendor">
            <div className="policy-section-header">
              <div className="policy-section-number">5</div>
              <h2>Vendor/Customer/Partner Acceptance Policy</h2>
            </div>

            <PolicyAlert type="warning" icon={<Shield size={24} />}>
              <strong>🚫 Zero Tolerance for Sanctioned Entities</strong>
              The Company adopts a strict zero-tolerance policy towards any vendor, customer, or partner found on a sanctions list. Such entities should not be onboarded, and existing relationships must be immediately terminated.
            </PolicyAlert>

            <h3>Prohibited Associations</h3>
            <p>The Company will NOT accept or conduct transactions with persons in the following circumstances:</p>
            <ol>
              <li>Identified as criminals or associated with criminal groups</li>
              <li>Identified as terrorists or associated with terrorist groups/activities</li>
              <li>From jurisdictions with high levels of criminal or terrorist activity</li>
              <li>Involved in high-risk criminal activities</li>
              <li>From jurisdictions with significant corruption or illegal drug trade</li>
              <li>Subject of requests from financial intelligence units or law enforcement</li>
              <li>From high-risk jurisdictions identified by authorities</li>
              <li>From jurisdictions without adequate ABC/AML requirements</li>
              <li>Where staff believe transaction may be related to money laundering or terrorism financing</li>
            </ol>

            <h3>Escalation Procedure</h3>
            <p>When potential AML risks or negative news is identified:</p>
            <ol>
              <li><strong>Immediate Notification:</strong> Promptly notify the CCO/CO</li>
              <li><strong>Review and Verification:</strong> CCO/CO conducts thorough review</li>
              <li><strong>Risk Assessment:</strong> Assess level of risk and legal implications</li>
              <li><strong>Decision Making:</strong> Decide to accept, terminate, or suspend relationship</li>
              <li><strong>Legal Compliance:</strong> Ensure compliance with all applicable laws</li>
              <li><strong>Communication:</strong> Inform stakeholders and document decision</li>
              <li><strong>Reporting:</strong> Report to regulatory authorities if required</li>
              <li><strong>Enhanced Due Diligence:</strong> Implement if relationship continues</li>
              <li><strong>Continuous Monitoring:</strong> Establish ongoing monitoring process</li>
              <li><strong>Policy Adjustment:</strong> Recommend policy improvements if needed</li>
            </ol>
          </section>

          {/* Sanctions Section */}
          <section className="policy-section" id="sanctions">
            <div className="policy-section-header">
              <div className="policy-section-number">6</div>
              <h2>Sanctions Program</h2>
            </div>

            <p>Sanctions are imposed by the EU, United Nations, and governments and include financial/trading restrictions, asset freezes, travel restrictions, and trade prohibitions. The Company has due regard to relevant applicable sanction programs.</p>

            <h3>EU Sanctions</h3>
            <p>The EU imposes sanctions through Council Regulations targeting governments, entities, and individuals. These sanctions apply to:</p>
            <ul>
              <li>All persons and entities doing business in the EU</li>
              <li>Nationals of non-EU countries operating in the EU</li>
              <li>EU nationals and entities when doing business outside the EU</li>
            </ul>

            <h3>US Sanctions (OFAC)</h3>
            <p>The Office of Foreign Asset Control (OFAC) administers US sanctions programs against targeted foreign countries, terrorists, narcotics traffickers, and WMD proliferators. OFAC publishes lists of Specially Designated Nationals (SDNs).</p>

            <PolicyAlert type="info" icon={<Info size={24} />}>
              <strong>📋 Screening Requirement</strong>
              The Company screens against OFAC and other sanctions lists using reliable sources and will not undertake any business activities that are not allowed under OFAC sanctions.
            </PolicyAlert>
          </section>

          {/* Consequences Section */}
          <section className="policy-section" id="consequences">
            <div className="policy-section-header">
              <div className="policy-section-number">7</div>
              <h2>Consequences &amp; Monitoring</h2>
            </div>

            <h3>Consequences of Violation</h3>
            <PolicyAlert type="warning" icon={<AlertTriangle size={24} />}>
              <strong>⚠️ Serious Consequences</strong>
              Bribery is a serious criminal offence that can result in severe fines, imprisonment, exclusion from public contracts, and severe reputational damage.
            </PolicyAlert>

            <ul>
              <li><strong>For Employees:</strong> Disciplinary action up to and including dismissal as prescribed under the Employee Handbook Manual</li>
              <li><strong>For Other Covered Persons:</strong> Legal remedies and/or immediate termination of contract</li>
              <li><strong>For the Company:</strong> Exposure to criminal/civil claims, large fines, imprisonment, and reputational harm</li>
              <li><strong>Failure to Report:</strong> Constitutes an independent violation subject to disciplinary action</li>
            </ul>

            <h3>Responsibilities</h3>
            <h4>ESG Committee</h4>
            <p>Responsible for monitoring the use and effectiveness of this Policy. The CCO/CO reports to the ESG Committee.</p>

            <h4>Chief Compliance Officer / Compliance Officer</h4>
            <ul>
              <li>Ensure policy compliance with legal and ethical obligations</li>
              <li>Foster a culture of compliance and effective controls</li>
              <li>Conduct annual trainings (in English and local vernacular)</li>
              <li>Communicate consequences of non-compliance</li>
            </ul>

            <h4>All Covered Persons</h4>
            <ul>
              <li>Read and follow this Policy</li>
              <li>Understand and identify red flags</li>
              <li>Escalate compliance concerns to CCO/CO and Legal team</li>
              <li>Exercise whistleblower rights when necessary</li>
            </ul>

            <PolicyAlert type="success" icon={<CheckCircle size={24} />}>
              <strong>🔍 Annual Review</strong>
              This Policy will be annually reviewed and updated as needed to ensure it continues to be adequate and effective.
            </PolicyAlert>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

// Alert Component (typed properly)
interface PolicyAlertProps {
  type: 'warning' | 'info' | 'success';
  icon: React.ReactNode;
  children: React.ReactNode;
}

const PolicyAlert = ({ type, icon, children }: PolicyAlertProps) => {
  return (
    <div className={`policy-alert policy-alert-${type}`}>
      <div className="policy-alert-icon">{icon}</div>
      <div>{children}</div>
    </div>
  );
};

export default Policies;
