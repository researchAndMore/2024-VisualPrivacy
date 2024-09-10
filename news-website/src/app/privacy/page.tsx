import { Back } from '@/components/back';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { SearchParams } from '@/components/types';

export default function Privacy({ searchParams }: { searchParams?: SearchParams }) {
    return (
        <div className="flex flex-col">
            <header className=" flex items-center bg-white">
                <div className="flex items-center justify-between p-2 text-xl group ml-10 left-0 absolute">
                    <Link href={{ pathname: '/', query: { userId: searchParams?.userId } }}>
                        <Back />
                    </Link>
                </div>
                <Link
                    href={{ pathname: '/', query: { userId: searchParams?.userId } }}
                    className="justify-self-center m-auto"
                >
                    {/* <NewspaperIcon className="h-6 w-6" /> */}
                    <Image
                        src="/connectNewsLogo1.png"
                        height={0}
                        width={0}
                        sizes="100vw"
                        style={{ width: '150px', height: 'auto' }}
                        alt="logo"
                    />
                </Link>
            </header>
            <div className="flex flex-1 justify-center">
                <div className="w-2/3 mt-10">
                    <h1 className="text-3xl font-bold text-center">Privacy Policy</h1>
                    <CardHeader>
                        <CardContent className="pt-4">
                            Last updated: 21 June 2024
                            <br />
                            <br />
                            Connect news is a global media and entertainment family of companies. We offer a wide array
                            of products and services to entertain, delight, and inform you,. When you use our websites
                            (“<strong>Service</strong>”), we may collect information about you (“
                            <strong>Information”</strong>), including information considered “personal information” or
                            “personal data” under applicable privacy laws. This Privacy Policy is not for Services or
                            experiences directed to children. This Privacy Policy contains:
                            <ul className="list-disc list-inside ml-10">
                                <li>
                                    <a href="#information" className="text-blue-500">
                                        What Information Do We Collect?
                                    </a>
                                </li>
                                <li>
                                    <a href="#sources" className="text-blue-500">
                                        What Are Our Sources of Information?
                                    </a>
                                </li>
                                <li>
                                    <a href="#usage" className="text-blue-500">
                                        How Do We Use the Information We Collect?
                                    </a>
                                </li>
                                <li>
                                    <a href="#disclosure" className="text-blue-500">
                                        Who Do We Disclose Your Information To?
                                    </a>
                                </li>
                                <li>
                                    <a href="#cookies" className="text-blue-500">
                                        What Do You Need to Know About Cookies and Other Identifiers?
                                    </a>
                                </li>
                                <li>
                                    <a href="#control" className="text-blue-500">
                                        How Can You Control Your Information?
                                    </a>
                                </li>
                                <li>
                                    <a href="#changes" className="text-blue-500">
                                        What Happens If We Change or Revise This Policy?
                                    </a>
                                </li>
                            </ul>
                        </CardContent>
                        <CardTitle id="information" className="px-6">
                            What Information Do We Collect?
                        </CardTitle>
                        <CardContent className="pt-4">
                            We collect Information about you when you use our Service. This Information includes: We
                            collect Information when you interact with our Services online or offline. In general, the
                            Information we collect is either (a) provided by you, (b) collected by us when you use our
                            Services, or (c) given to us by third parties. Where required by law, we get your consent to
                            collect this Information. This Information includes:
                            <ul className="list-disc list-inside ml-10">
                                <li>
                                    <strong>Account and Contact Information</strong>: Name, phone number, postal
                                    address, email address, username, password, age, or birth date.
                                </li>
                                <li>
                                    <strong>Payment, Purchase and Account Information</strong>: Credit, debit or other
                                    payment card information and Information about your subscription, account,
                                    purchases, or discounts.
                                </li>
                                <li>
                                    <strong>Demographic Information</strong>: In limited cases, physical or mental
                                    health, race, or ethnicity, religious or philosophical beliefs, sex life, sexual
                                    orientation, or political affiliation.
                                </li>
                                <li>
                                    <strong>Location Information</strong>: coarse location (i.e., Information derived
                                    from device information associated with your IP address, city or country code, or
                                    address) or precise location for limited services and/or region-specific offerings.
                                </li>
                                <li>
                                    <strong>Device and Other Technical Information</strong>: Information about your
                                    hardware, operating system, browser type, browser settings, your mobile carrier or
                                    Internet Service Provider, and unique identifiers associated with your device,
                                    including IP address.
                                </li>
                                <li>
                                    <strong>Photos, Videos, or Audio Information</strong>: Images or recordings from
                                    your device or that you otherwise post or submit to us or photos or recordings of
                                    you from live experiences or events.
                                </li>
                                <li>
                                    <strong>Usage and Viewing Information</strong>: Films, TV shows, and videos that you
                                    view (including title and genre, watchlists you compile, and searches you conduct),
                                    webpages, apps, and ads you see and interact with, as well as the accounts you link
                                    together, including recordings of your interactions with our Services, which may
                                    include mouse clicks, mouse movements, keystrokes, and page scrolling. When you use
                                    our Service, you consent to the recording of your interactions with us.
                                </li>
                                <li>
                                    <strong>Social Media Information</strong>: Information about your social media
                                    engagement and interaction with social media sites.
                                </li>
                                <li>
                                    <strong>Other Information You Provide</strong>: Information you provide when you use
                                    our Services or participate in our events, surveys, or promotions or when you
                                    interact with us or others on our channels, pages, and accounts on social media and
                                    other companies’ platforms. For instance, we may collect chats, comments, posts,
                                    customer service communications. We may also collect data that could be considered
                                    biometric if you choose to participate in one of our interactive research studies or
                                    other initiatives that involve the collection of this data.
                                </li>
                            </ul>
                        </CardContent>
                        <CardTitle id="sources" className="px-6">
                            What Are Our Sources of Information?
                        </CardTitle>
                        <CardContent className="pt-4">
                            In addition to the Information we collect from you directly, CONNECT NEWS may receive
                            Information about you from a variety of sources, including other individuals and third-party
                            businesses. For instance, we may receive Information about you from the following sources:
                            <ul className="list-disc list-inside ml-10">
                                <li>
                                    <strong>Friends and Other People</strong>. We may receive Information from people
                                    you know, such as when a friend invites you to participate in an offering, makes
                                    recommendations, or discloses content to you.
                                </li>
                                <li>
                                    <strong>Companies You Direct to Disclose Information</strong>. We receive the
                                    Information you ask other companies to provide to us, such as your mobile carrier,
                                    your device carrier, or your cable or TV provider for authentication and
                                    personalization, to receive access to our content, or to participate in special
                                    events.
                                </li>
                                <li>
                                    <strong>Linked Sites and Tools</strong>. We may receive Information from websites
                                    and tools offered by companies that are not affiliated with us, but that are linked
                                    to or integrated in our Services or provide links to our Services, such as
                                    third-party communities, forums, and social media sites, services, plug-ins, and
                                    applications. Your interactions with websites and tools offered by companies that
                                    are not affiliated with us are covered by the privacy policies of those companies,
                                    not this Privacy Policy. You should carefully read the privacy policies of websites
                                    and tools you use.
                                </li>
                                <li>
                                    <strong>Publicly Available Sources</strong>. In limited cases, we may get
                                    Information from publicly available sources.
                                </li>
                                <li>
                                    <strong>CONNECT NEWS Technology and Service Providers</strong>. We may receive
                                    Information from our service providers and other technology partners we work with,
                                    such as companies that assist us with account validation, analytics, fraud
                                    prevention, or otherwise help us run our Services, including attractions, events,
                                    and exhibits such as a film premier or influencer event.
                                </li>
                                <li>
                                    <strong>CONNECT NEWS Advertising and Marketing Partners</strong>. We work with
                                    advertising and marketing partners, such as advertisers, app developers, publishers,
                                    and data providers that enable us to purchase or deliver ads as well as personalize,
                                    target, and measure the performance of those ads or campaigns. These partners may
                                    provide Information about your preferences or interests or may provide Information
                                    that is inferred or derived based on your information, activity, or interactions
                                    from different businesses not associated with CONNECT NEWS.
                                </li>
                                <li>
                                    <strong>Joint Venture, Promotional, or Strategic Partners</strong>. When we partner
                                    with other companies, we may receive Information from them.
                                </li>
                            </ul>
                            <br />
                            We may combine this Information with Information we collect directly from you.
                        </CardContent>
                        <CardTitle id="usage" className="px-6">
                            How Do We Use the Information We Collect?
                        </CardTitle>
                        <CardContent className="pt-4">
                            CONNECT NEWS uses your Information to provide you with our amazing range of Services. We use
                            Information only as permitted or required by law and as described in this privacy policy or
                            otherwise disclosed at the time of collection.
                            <ul className="list-disc list-inside ml-10">
                                <li>
                                    <strong>Provide Services</strong>. We use your Information to provide our wide range
                                    of Services that you request, view, or otherwise engage with. This might include
                                    customizing and personalizing the Services for you.
                                </li>
                                <li>
                                    <strong>Improve our Services</strong>. We may analyze your information (and create
                                    aggregated data derived from your Information) to develop, maintain, analyze,
                                    optimize, improve, measure, and report on our Services and Services features and how
                                    they are used.
                                </li>
                                <li>
                                    <strong>Communications</strong>. We may send you communications, including by email,
                                    push notifications, or text, about purchases, your account, offers, contests,
                                    surveys, changes to policies, customer service inquiries, or to request feedback. We
                                    may record your comments, text, or voice communications for purposes of making
                                    features available, improving our services, and addressing potential abuses of the
                                    terms of use that apply to our Services. or other concerns on behalf of our users.
                                </li>
                                <li>
                                    <strong>Advertising and Marketing</strong>. We promote our brands and offerings by
                                    publishing advertising on our own Services and by placing ads on third parties’
                                    services. We also provide advertising services for third party advertisers. We may
                                    use your Information to model, segment, target, offer, market, and advertise our
                                    Services, including providing discounts or offerings from our affiliates, business
                                    partners, and select third parties, and running competitions on social media and
                                    other channels. We may also use your Information to provide and improve our
                                    advertising services, including how we target and measure our publishing of ads for
                                    third party advertisers.
                                </li>
                                <li>
                                    <strong>Operate our Business</strong>. We also use Information to support our
                                    internal business functions, including finance, accounting, and audit.
                                </li>
                                <li>
                                    <strong>Safety, Security, Fraud Prevention</strong>. We may use your Information to
                                    enhance the safety and security of our Services. We may also use it to verify your
                                    identity, monitor, investigate, and prevent fraud, and halt other unauthorized or
                                    illegal activity.
                                </li>
                                <li>
                                    <strong>Comply with Law and our Terms of Use</strong>. We may use your Information
                                    to comply with applicable law, such as to satisfy a tax obligation or government
                                    request. We may also use it to enforce or defend our rights, investigate, or report
                                    potential violations of our Terms of Use.
                                </li>
                                <li>
                                    <strong>With Your Consent</strong>. We may use your Information with your consent
                                    for other purposes described at the point of collection.
                                </li>
                                <li>
                                    <strong>Deriving aggregated data</strong>. We may analyze your Information to create
                                    aggregated data that we use in connection with any of the other uses of Information
                                    set out in this section.
                                </li>
                                <li>
                                    <strong>Retention</strong>. We only keep Information for as long as we need it to
                                    fulfil the purpose we are using it for, as permitted by law.
                                </li>
                            </ul>
                        </CardContent>
                        <CardTitle id="disclosure" className="px-6">
                            Who Do We Disclose Your Information To?
                        </CardTitle>
                        <CardContent className="pt-4">
                            CONNECT NEWS may disclose Information to:
                            <ul className="list-disc list-inside ml-10">
                                <li>
                                    <strong>Service Providers</strong>. CONNECT NEWS hires vendors and other companies
                                    to perform services for us such as creation, maintenance, hosting, delivery, and
                                    marketing of our Services. This may include processing payments, email and order
                                    fulfillment, administration of contests, customer service, or conducting research
                                    and analytics, including recording of mouse movements or clicks, keyboard
                                    strokes/touches, page scrolls, typed text or other interactions during a user
                                    session. We may also use service providers to enable our chat, comments, or survey
                                    features, to moderate comments and chat among our users or to verify disclosures
                                    from influencers we work with. These chat, comment, survey, or moderation service
                                    providers may obtain recordings of your comments, text, or voice communications for
                                    purposes of making the feature available, improving our services, or addressing
                                    potential abuses of our Terms of Use or other concerns on behalf of our users.
                                </li>
                                <li>
                                    <strong>Business Partners and Third Parties</strong>. We may disclose Information to
                                    business partners and third parties (e.g., other companies, retailers, distributors,
                                    social media networks, research organizations, publishers, and non-profit
                                    organizations) for their own purposes, including marketing products or services to
                                    you, showing you relevant advertising, or providing an enhanced experience that
                                    integrates with one of our Services. When required, we will ask for your consent or
                                    provide opportunities to opt-out.
                                </li>
                                <li>
                                    <strong>Sponsors, Co-promotions, and Branded Programs</strong>. We may offer content
                                    or programs (e.g., competitions, sweepstakes, promotions, games, applications,
                                    branded community or panel programs or social media integrations) that are sponsored
                                    by or co-branded with third parties that may collect or obtain Information from
                                    participants. When you participate in branded community or panel programs your name
                                    and contact information may also be disclosed to other participants or made public.
                                </li>
                                <li>
                                    <strong>Advertising and Marketing Companies</strong>. CONNECT NEWS may disclose
                                    Information with advertisers, ad agencies, ad networks and platforms and other
                                    companies to provide advertising to you based on your interests.
                                </li>
                                <li>
                                    <strong>Legal and Law enforcement Purposes</strong>. CONNECT NEWS may disclose
                                    Information in response to legal process, for example in response to a court order
                                    or a subpoena, or in response to a law enforcement agency&apos;s request. We may
                                    disclose Information to third parties for fraud prevention, to investigate or
                                    prevent illegal activities or violations of the terms of use of our Services, to
                                    protect the rights and safety of others, or as otherwise required by law.
                                </li>
                                <li>
                                    <strong>Change of Control</strong>. CONNECT NEWS may transfer Information in the
                                    event of an actual or potential business transaction, such as if one or more of our
                                    business units or assets are acquired by, sold to, or merged with another company or
                                    as part of a bankruptcy proceeding or a business reorganization.
                                </li>
                                <li>
                                    <strong>Others</strong>. We may disclose Information at your direction or when you
                                    provide us with your consent to do so, for example, when we disclose information to
                                    a third party to link an account you have with us to the third party’s account.
                                </li>
                            </ul>
                        </CardContent>
                        <CardTitle id="cookies" className="px-6">
                            What Do You Need to Know About Cookies and Other Identifiers?
                        </CardTitle>
                        <CardContent className="pt-4">
                            A cookie or other tracking technology is a small piece of script or code that is stored on
                            your browser or device to help websites and apps remember you and collect information about
                            your use of the Service. CONNECT NEWS uses cookies, web beacons, SDKs, pixels and other
                            tracking technologies (collectively referred to as “cookies”) to make your experience on our
                            Services better. These technologies help recognize your browser or device, maintain your
                            preferences, and provide certain features (like storing a high score on a game or saving
                            your location). CONNECT NEWS (including our affiliates) and third parties may use these
                            technologies to collect information over time from apps, websites, and other digital
                            products. We and third-party advertising companies may use this Information to help serve
                            advertising tailored to your interests, both on and off the CONNECT NEWS Services. These
                            technologies also help measure advertisements across our Services, marketing emails and
                            other third-party websites, apps, devices, and services.
                            <br />
                            We may also work with third parties that collect data about your use of the Services and
                            other sites or apps over time for non-advertising purposes.
                            <br />
                            Please see the How Can You Control Your Information? for more information about your choices
                            with respect to Information collected via cookies.
                        </CardContent>
                        <CardTitle id="control" className="px-6">
                            How Can You Control Your Information?
                        </CardTitle>
                        <CardContent className="pt-4">
                            There are a number of tools and options you can use to help control how your Information is
                            collected, used, and disclosed.
                            <ul className="list-disc list-inside ml-10">
                                <li>
                                    <strong>Individual Rights</strong>: depending on the country where you are based,
                                    you may request the following:
                                    <ul className="list-disc list-inside ml-10">
                                        <li>
                                            <strong>Right to access and rectification</strong>: you can request
                                            Information we hold and the correction of any errors of your Information.
                                        </li>
                                        <li>
                                            <strong>Right to erasure/deletion</strong>: the right, in certain
                                            circumstances, to ask for your Information to be deleted. In specific cases,
                                            we may not be able to delete some types of Information, in particular, where
                                            we have a legal obligation to keep that Information (e.g., for regulatory
                                            reporting purposes), or where you want us to continue to provide you with a
                                            Service and the processing of the Information is necessary for the provision
                                            of that Service.
                                        </li>
                                        <li>
                                            <strong>Right to restriction of processing</strong>: the right, in certain
                                            circumstances, to restrict further processing of your Information.
                                        </li>
                                        <li>
                                            <strong>Right to portability</strong>: the right in some cases to receive
                                            your Information in a digital format or to have it transmitted directly to
                                            another controller (where technically feasible)
                                        </li>
                                        <li>
                                            <strong>Right to object</strong>: The right to object (on grounds relating
                                            to your particular situation) to the processing of your Information on the
                                            basis of our legitimate interests, including for direct marketing purposes.
                                        </li>
                                        <li>
                                            <strong>Right to withdraw consent</strong>: you can withdraw your consent at
                                            any time in respect of any processing of Information which is based upon a
                                            consent.
                                        </li>
                                        <li>
                                            <strong>
                                                Right to lodge a complaint before the supervisory authority for data
                                                protection in your country
                                            </strong>
                                            , if you consider that your rights under the applicable privacy legislation
                                            have been infringed.
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            <br />
                            To exercise any of these rights that apply where you live, please submit a request by
                            navigating to the Individual Rights Request Portal.
                            <ul className="list-disc list-inside ml-10">
                                <li>
                                    <strong>Marketing Communications</strong>. If you would like to stop receiving email
                                    or text marketing communications from us, follow the “unsubscribe” instructions
                                    provided in the relevant email or respond “STOP” to the relevant text. In certain
                                    Services, you may also be able to opt out via the settings when you log into your
                                    account.
                                </li>
                                <li>
                                    <strong>Third-Party Targeted Advertising</strong>. You can also opt out of targeted
                                    advertising on websites by third parties that participate in self-regulatory
                                    programs by sending us an email.
                                </li>
                                <li>
                                    <strong>Browser and Device Settings</strong>. You may have more options depending on
                                    your mobile device, operating system, or browser. Please review the support
                                    materials and/or the privacy settings for the respective devices and systems to
                                    learn more about these features and how they apply to targeted advertisements.
                                    Blocking cookies may also prevent you from accessing some of our content or Service
                                    features.
                                </li>
                                <li>
                                    <strong>Precise Location Information</strong>. To disable collection of mobile
                                    device precise location information through our apps, please access your device
                                    settings and choose to limit that collection.
                                </li>
                            </ul>
                            <br />
                            Please note some of the rights detailed above are not absolute, might not all be available
                            in your country, and may not be applicable in certain scenarios. If you have any particular
                            questions about your data protection rights, feel free to reach out to us by email at
                            <a href="mailto: connectnews@connectnews.com">connectnews@connectnews.com</a>.
                        </CardContent>
                        <CardTitle id="changes" className="px-6">
                            What Happens If We Change or Revise This Policy?
                        </CardTitle>
                        <CardContent className="pt-4">
                            From time to time, we may update this Privacy Policy and post the updated Policy here. We
                            encourage you to periodically check back and review this Policy so that you always know our
                            current privacy practices.
                        </CardContent>
                    </CardHeader>
                </div>
            </div>
        </div>
    );
}
