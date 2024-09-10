import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import './w3.css';
import { PrivacyExtensionInteraction } from '../../../db/schema';
import { handlePrivacyExtensionButtonClicked } from '@/app/actions';

export const ChromeExtensionMockup = ({ userId, privacyRating }: { userId: string; privacyRating: string }) => {
    const [showPopup, setShowPopup] = useState(true);
    const [showDetails, setShowDetails] = useState(false);
    const [openSubcategories, setOpenSubcategories] = useState({
        collection: false,
        sharing: false,
        control: false,
        security: false,
    });

    // B: 2-5
    // F: 18-21
    // the color of the subcategory is good: <= 2, medium: 3-4, bad: >= 5

    const privacyPolicyVersions = {
        collection: {
            collection: {
                '0': 'Collects anonymous data',
                '1': 'Collects personal data',
                '2': 'Collects sensitive data',
            },
            purpose: {
                '0': 'Used for functionality',
                '1': 'Used for customization',
                '2': 'Used for profiling',
            },
            retention: {
                '0': 'Data is not stored',
                '1': 'Data is stored for pre-determined limited time',
                '2': 'Data is stored indefinitely',
            },
        },
        sharing: {
            sharing: {
                '0': 'No sharing',
                '1': 'Sharing anonymous user data',
                '2': 'Sharing user data',
            },
            sale: {
                '0': 'No sale',
                '1': 'Sale of anonymous data',
                '2': 'Sale of user data',
            },
            disclosure: {
                '0': "Disclosure to local law enforcement (inside user's jurisdiction)",
                '1': "Disclosure to local law enforcement (outside user's jurisdiction)",
                '2': 'Disclosure to foreign law enforcement',
            },
        },
        control: {
            control: {
                '0': 'Opt-in',
                '1': 'No Opt-in',
                '2': 'Opt-out',
            },
            rightToBeForgotten: {
                '0': 'Deletion upon request',
                '1': 'Deletion upon hidden request',
                '2': 'Data cannot be removed',
            },
            correctness: {
                '0': 'All data can be amended',
                '1': 'Some data can be amended',
                '2': 'Data cannot be amended',
            },
        },
        security: {
            security: {
                '0': 'Industry standard security',
                '1': 'Basic security',
                '2': 'No security',
            },
            anonymization: {
                '0': 'Anonymous',
                '1': 'Partially anonymous',
                '2': 'Not anonymous',
            },
            accountability: {
                '0': 'Legally accountable',
                '1': 'Legally binding privacy policy',
                '2': 'Not legally accountable',
            },
        },
    };

    const pointsCollection =
        privacyRating === 'B'
            ? {
                  collection: 0,
                  purpose: 0,
                  retention: 1,
              }
            : privacyRating === 'F'
            ? {
                  collection: 2,
                  purpose: 2,
                  retention: 2,
              }
            : {
                  collection: 1,
                  purpose: 1,
                  retention: 1,
              };

    const pointsSharing =
        privacyRating === 'B'
            ? {
                  sharing: 0,
                  sale: 1,
                  disclosure: 0,
              }
            : privacyRating === 'F'
            ? {
                  sharing: 2,
                  sale: 1,
                  disclosure: 1,
              }
            : {
                  sharing: 1,
                  sale: 1,
                  disclosure: 1,
              };

    const pointsControl =
        privacyRating === 'B'
            ? {
                  control: 1,
                  rightToBeForgotten: 1,
                  correctness: 0,
              }
            : privacyRating === 'F'
            ? {
                  control: 0,
                  rightToBeForgotten: 2,
                  correctness: 1,
              }
            : {
                  control: 1,
                  rightToBeForgotten: 1,
                  correctness: 1,
              };

    const pointsSecurity =
        privacyRating === 'B'
            ? {
                  security: 0,
                  anonymization: 0,
                  accountability: 0,
              }
            : privacyRating === 'F'
            ? {
                  security: 2,
                  anonymization: 2,
                  accountability: 2,
              }
            : {
                  security: 1,
                  anonymization: 1,
                  accountability: 1,
              };

    const privacyColors = {
        good: 'rgb(145, 210, 100)',
        medium: 'rgb(252, 239, 100)',
        bad: 'rgb(220, 115, 44)',
    };

    const getDotColor = (points: number) => {
        if (points === 0) return 'green';
        else if (points === 1) return 'yellow';
        else if (points === 2) return 'red';
    };

    const calculateSubcategoryColor = (points: { [key: string]: number }) => {
        const sum = Object.values(points).reduce((acc, curr) => acc + curr, 0);
        if (sum <= 2) return privacyColors.good;
        if (sum >= 5) return privacyColors.bad;
        return privacyColors.medium;
    };
    const colorCollection = calculateSubcategoryColor(pointsCollection);
    const colorSharing = calculateSubcategoryColor(pointsSharing);
    const colorControl = calculateSubcategoryColor(pointsControl);
    const colorSecurity = calculateSubcategoryColor(pointsSecurity);

    const handleSubCategoryClick = async (subCategory: string) => {
        setOpenSubcategories((prevState) => ({
            collection: false,
            sharing: false,
            control: false,
            security: false,
            [subCategory]: !prevState[subCategory as keyof typeof prevState],
        }));

        const data: PrivacyExtensionInteraction = {
            userId: userId,
        };
        if (subCategory === 'collection') data.collectionClicked = true;
        if (subCategory === 'sharing') data.sharingClicked = true;
        if (subCategory === 'control') data.controlClicked = true;
        if (subCategory === 'security') data.securityClicked = true;
        await handlePrivacyExtensionButtonClicked(data);
    };

    return (
        showPopup && (
            <div
                className="flex fixed top-20 right-5 bg-white items-center"
                style={{
                    width: 250,
                    backgroundColor: showDetails ? 'white' : 'transparent',
                }}
                onMouseLeave={() => setShowDetails(false)}
            >
                {showDetails ? (
                    <div
                        id="visual-privacy-popup"
                        className="w3-container w3-text-black w-full"
                        style={{ padding: 10 }}
                    >
                        <button
                            id="visual-privacy-toggle"
                            className="w3-button w3-text-white w3-red w3-hover-white"
                            onClick={() => setShowPopup(false)}
                        >
                            X
                        </button>
                        {/* popup header */}
                        {/* <div id="visual-privacy-header" class="w3-center">
  <h3 class="w3-text-black">Visual Privacy</h3>
    </div> */}
                        {/* popup content */}
                        <div id="visual-privacy-content" className="w3-center">
                            {/* rating grade image */}
                            {privacyRating && (
                                <div
                                    className="w3-row w3-center"
                                    style={{
                                        margin: 'auto',
                                        width: '85%',
                                        paddingTop: 10,
                                        paddingBottom: 25,
                                    }}
                                >
                                    <Image
                                        width={0}
                                        height={0}
                                        sizes="100vw"
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                        }}
                                        src={`/score_images/PrivacyRating${privacyRating}.png`}
                                        alt={`Privacy Rating `}
                                    />
                                </div>
                            )}
                            {/* scale */}
                            <div className="w3-row w3-container w3-center w3-margin-bottom" id="visual-privacy-scale">
                                <div
                                    id="scale-a"
                                    className={
                                        privacyRating === 'A'
                                            ? 'w3-col w3-border-black w3-border'
                                            : 'w3-col w3-border-black'
                                    }
                                    style={{ width: '14.27%', backgroundColor: 'rgb(86, 167, 91)' }}
                                >
                                    <p>A</p>
                                </div>
                                <div
                                    id="scale-b"
                                    className={
                                        privacyRating === 'B'
                                            ? 'w3-col w3-border-black w3-border'
                                            : 'w3-col w3-border-black'
                                    }
                                    style={{ width: '14.27%', backgroundColor: 'rgb(145, 210, 100)' }}
                                >
                                    <p>B</p>
                                </div>
                                <div
                                    id="scale-c"
                                    className={
                                        privacyRating === 'C'
                                            ? 'w3-col w3-border-black w3-border'
                                            : 'w3-col w3-border-black'
                                    }
                                    style={{ width: '14.27%', backgroundColor: 'rgb(200, 233, 138)' }}
                                >
                                    <p>C</p>
                                </div>
                                <div
                                    id="scale-d"
                                    className={
                                        privacyRating === 'D'
                                            ? 'w3-col w3-border-black w3-border'
                                            : 'w3-col w3-border-black'
                                    }
                                    style={{ width: '14.27%', backgroundColor: 'rgb(252, 239, 100)' }}
                                >
                                    <p>D</p>
                                </div>
                                <div
                                    id="scale-e"
                                    className={
                                        privacyRating === 'E'
                                            ? 'w3-col w3-border-black w3-border'
                                            : 'w3-col w3-border-black'
                                    }
                                    style={{ width: '14.27%', backgroundColor: 'rgb(229, 178, 91)' }}
                                >
                                    <p>E</p>
                                </div>
                                <div
                                    id="scale-f"
                                    className={
                                        privacyRating === 'F'
                                            ? 'w3-col w3-border-black w3-border'
                                            : 'w3-col w3-border-black'
                                    }
                                    style={{ width: '14.27%', backgroundColor: 'rgb(220, 115, 44)' }}
                                >
                                    <p>F</p>
                                </div>
                                <div
                                    id="scale-g"
                                    className={
                                        privacyRating === 'G'
                                            ? 'w3-col w3-border-black w3-border'
                                            : 'w3-col w3-border-black'
                                    }
                                    style={{ width: '14.27%', backgroundColor: 'rgb(213, 60, 40)' }}
                                >
                                    <p>G</p>
                                </div>
                            </div>
                            {/* categories */}
                            <div className="w3-margin-bottom" id="visual-privacy-verbose">
                                <div className="w3-container">
                                    <button
                                        id="privacyCollectionButton"
                                        className="w3-button"
                                        style={{ width: '100%', backgroundColor: colorCollection }}
                                        onClick={async () => {
                                            await handleSubCategoryClick('collection');
                                        }}
                                    >
                                        &gt; Collection
                                    </button>
                                    {openSubcategories.collection && (
                                        <div
                                            className="w3-padding"
                                            id="privacyCollectionContent"
                                            style={{ width: '100%' }}
                                        >
                                            <div id="collection-collection">
                                                <div className="w3-row">
                                                    <div className="w3-col" style={{ width: '10%' }}>
                                                        <p>
                                                            <span
                                                                id="dot-collection"
                                                                style={{
                                                                    width: '15px',
                                                                    height: '15px',
                                                                    backgroundColor: getDotColor(
                                                                        pointsCollection.collection
                                                                    ),
                                                                    display: 'inline-block',
                                                                    borderRadius: '50%',
                                                                }}
                                                            />
                                                        </p>
                                                    </div>
                                                    <div className="w3-rest">
                                                        <p
                                                            id="subcategory-collection"
                                                            className="w3-small"
                                                            style={{ margin: 0 }}
                                                        >
                                                            {
                                                                privacyPolicyVersions.collection.collection[
                                                                    pointsCollection.collection.toString() as keyof typeof privacyPolicyVersions.collection.collection
                                                                ]
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="collection-purpose">
                                                <div className="w3-row">
                                                    <div className="w3-col" style={{ width: '10%' }}>
                                                        <p style={{ margin: 0 }}>
                                                            <span
                                                                id="dot-purpose"
                                                                style={{
                                                                    width: '15px',
                                                                    height: '15px',
                                                                    backgroundColor: getDotColor(
                                                                        pointsCollection.purpose
                                                                    ),
                                                                    display: 'inline-block',
                                                                    borderRadius: '50%',
                                                                }}
                                                            />
                                                        </p>
                                                    </div>
                                                    <div className="w3-rest">
                                                        <p
                                                            id="subcategory-purpose"
                                                            className="w3-small"
                                                            style={{ margin: 0 }}
                                                        >
                                                            {
                                                                privacyPolicyVersions.collection.purpose[
                                                                    pointsCollection.purpose.toString() as keyof typeof privacyPolicyVersions.collection.purpose
                                                                ]
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="collection-Retention">
                                                <div className="w3-row">
                                                    <div className="w3-col" style={{ width: '10%' }}>
                                                        <p style={{ margin: 0 }}>
                                                            <span
                                                                id="dot-retention"
                                                                style={{
                                                                    width: '15px',
                                                                    height: '15px',
                                                                    backgroundColor: getDotColor(
                                                                        pointsCollection.retention
                                                                    ),
                                                                    display: 'inline-block',
                                                                    borderRadius: '50%',
                                                                }}
                                                            />
                                                        </p>
                                                    </div>
                                                    <div className="w3-rest">
                                                        <p
                                                            id="subcategory-retention"
                                                            className="w3-small"
                                                            style={{ margin: 0 }}
                                                        >
                                                            {
                                                                privacyPolicyVersions.collection.retention[
                                                                    pointsCollection.retention.toString() as keyof typeof privacyPolicyVersions.collection.retention
                                                                ]
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="w3-container">
                                    <button
                                        id="privacySharingButton"
                                        className="w3-button"
                                        style={{ width: '100%', backgroundColor: colorSharing }}
                                        onClick={async () => await handleSubCategoryClick('sharing')}
                                    >
                                        &gt; Sharing
                                    </button>
                                    {openSubcategories.sharing && (
                                        <div
                                            className="w3-padding"
                                            id="privacySharingContent"
                                            style={{ width: '100%' }}
                                        >
                                            <div id="sharing-sharing">
                                                <div className="w3-row">
                                                    <div className="w3-col" style={{ width: '10%' }}>
                                                        <p style={{ margin: 0 }}>
                                                            <span
                                                                id="dot-sharing"
                                                                style={{
                                                                    width: '15px',
                                                                    height: '15px',
                                                                    backgroundColor: getDotColor(pointsSharing.sharing),
                                                                    display: 'inline-block',
                                                                    borderRadius: '50%',
                                                                }}
                                                            />
                                                        </p>
                                                    </div>
                                                    <div className="w3-rest">
                                                        <p
                                                            id="subcategory-sharing"
                                                            className="w3-small"
                                                            style={{ margin: 0 }}
                                                        >
                                                            {
                                                                privacyPolicyVersions.sharing.sharing[
                                                                    pointsSharing.sharing.toString() as keyof typeof privacyPolicyVersions.sharing.sharing
                                                                ]
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="sharing-sale">
                                                <div className="w3-row">
                                                    <div className="w3-col" style={{ width: '10%' }}>
                                                        <p style={{ margin: 0 }}>
                                                            <span
                                                                id="dot-sale"
                                                                style={{
                                                                    width: '15px',
                                                                    height: '15px',
                                                                    backgroundColor: getDotColor(pointsSharing.sale),
                                                                    display: 'inline-block',
                                                                    borderRadius: '50%',
                                                                }}
                                                            />
                                                        </p>
                                                    </div>
                                                    <div className="w3-rest">
                                                        <p
                                                            id="subcategory-sale"
                                                            className="w3-small"
                                                            style={{ margin: 0 }}
                                                        >
                                                            {
                                                                privacyPolicyVersions.sharing.sale[
                                                                    pointsSharing.sale.toString() as keyof typeof privacyPolicyVersions.sharing.sale
                                                                ]
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="sharing-disclosure">
                                                <div className="w3-row">
                                                    <div className="w3-col" style={{ width: '10%' }}>
                                                        <p style={{ margin: 0 }}>
                                                            <span
                                                                id="dot-disclosure"
                                                                style={{
                                                                    width: '15px',
                                                                    height: '15px',
                                                                    backgroundColor: getDotColor(
                                                                        pointsSharing.disclosure
                                                                    ),
                                                                    display: 'inline-block',
                                                                    borderRadius: '50%',
                                                                }}
                                                            />
                                                        </p>
                                                    </div>
                                                    <div className="w3-rest">
                                                        <p
                                                            id="subcategory-disclosure"
                                                            className="w3-small"
                                                            style={{ margin: 0 }}
                                                        >
                                                            {
                                                                privacyPolicyVersions.sharing.disclosure[
                                                                    pointsSharing.disclosure.toString() as keyof typeof privacyPolicyVersions.sharing.disclosure
                                                                ]
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="w3-container">
                                    <button
                                        id="privacyControlButton"
                                        className="w3-button"
                                        style={{ width: '100%', backgroundColor: colorControl }}
                                        onClick={async () => await handleSubCategoryClick('control')}
                                    >
                                        &gt; Control
                                    </button>

                                    {openSubcategories.control && (
                                        <div
                                            className="w3-padding"
                                            id="privacyControlContent"
                                            style={{ width: '100%' }}
                                        >
                                            <div id="control-control">
                                                <div className="w3-row">
                                                    <div className="w3-col" style={{ width: '10%' }}>
                                                        <p style={{ margin: 0 }}>
                                                            <span
                                                                id="dot-control"
                                                                style={{
                                                                    width: '15px',
                                                                    height: '15px',
                                                                    backgroundColor: getDotColor(pointsControl.control),
                                                                    display: 'inline-block',
                                                                    borderRadius: '50%',
                                                                }}
                                                            />
                                                        </p>
                                                    </div>
                                                    <div className="w3-rest">
                                                        <p
                                                            id="subcategory-control"
                                                            className="w3-small"
                                                            style={{ margin: 0 }}
                                                        >
                                                            {
                                                                privacyPolicyVersions.control.control[
                                                                    pointsControl.control.toString() as keyof typeof privacyPolicyVersions.control.control
                                                                ]
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="control-right-to-be-forgotten">
                                                <div className="w3-row">
                                                    <div className="w3-col" style={{ width: '10%' }}>
                                                        <p style={{ margin: 0 }}>
                                                            <span
                                                                id="dot-right-to-be-forgotten"
                                                                style={{
                                                                    width: '15px',
                                                                    height: '15px',
                                                                    backgroundColor: getDotColor(
                                                                        pointsControl.rightToBeForgotten
                                                                    ),
                                                                    display: 'inline-block',
                                                                    borderRadius: '50%',
                                                                }}
                                                            />
                                                        </p>
                                                    </div>
                                                    <div className="w3-rest">
                                                        <p
                                                            id="subcategory-rightToBeForgotten"
                                                            className="w3-small"
                                                            style={{ margin: 0 }}
                                                        >
                                                            {
                                                                privacyPolicyVersions.control.rightToBeForgotten[
                                                                    pointsControl.rightToBeForgotten.toString() as keyof typeof privacyPolicyVersions.control.rightToBeForgotten
                                                                ]
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="control-correctness">
                                                <div className="w3-row">
                                                    <div className="w3-col" style={{ width: '10%' }}>
                                                        <p style={{ margin: 0 }}>
                                                            <span
                                                                id="dot-correctness"
                                                                style={{
                                                                    width: '15px',
                                                                    height: '15px',
                                                                    backgroundColor: getDotColor(
                                                                        pointsControl.correctness
                                                                    ),
                                                                    display: 'inline-block',
                                                                    borderRadius: '50%',
                                                                }}
                                                            />
                                                        </p>
                                                    </div>
                                                    <div className="w3-rest">
                                                        <p
                                                            id="subcategory-correctness"
                                                            className="w3-small"
                                                            style={{ margin: 0 }}
                                                        >
                                                            {
                                                                privacyPolicyVersions.control.correctness[
                                                                    pointsControl.correctness.toString() as keyof typeof privacyPolicyVersions.control.correctness
                                                                ]
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="w3-container">
                                    <button
                                        id="privacySecurityButton"
                                        className="w3-button"
                                        style={{ width: '100%', backgroundColor: colorSecurity }}
                                        onClick={async () => await handleSubCategoryClick('security')}
                                    >
                                        &gt; Security
                                    </button>
                                    {openSubcategories.security && (
                                        <div
                                            className="w3-padding"
                                            id="privacySecurityContent"
                                            style={{ width: '100%' }}
                                        >
                                            <div id="security-security">
                                                <div className="w3-row">
                                                    <div className="w3-col" style={{ width: '10%' }}>
                                                        <p style={{ margin: 0 }}>
                                                            <span
                                                                id="dot-security"
                                                                style={{
                                                                    width: '15px',
                                                                    height: '15px',
                                                                    backgroundColor: getDotColor(
                                                                        pointsSecurity.security
                                                                    ),
                                                                    display: 'inline-block',
                                                                    borderRadius: '50%',
                                                                }}
                                                            />
                                                        </p>
                                                    </div>
                                                    <div className="w3-rest">
                                                        <p
                                                            id="subcategory-security"
                                                            className="w3-small"
                                                            style={{ margin: 0 }}
                                                        >
                                                            {
                                                                privacyPolicyVersions.security.security[
                                                                    pointsSecurity.security.toString() as keyof typeof privacyPolicyVersions.security.security
                                                                ]
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="security-anonymization">
                                                <div className="w3-row">
                                                    <div className="w3-col" style={{ width: '10%' }}>
                                                        <p style={{ margin: 0 }}>
                                                            <span
                                                                id="dot-anonymization"
                                                                style={{
                                                                    width: '15px',
                                                                    height: '15px',
                                                                    backgroundColor: getDotColor(
                                                                        pointsSecurity.anonymization
                                                                    ),
                                                                    display: 'inline-block',
                                                                    borderRadius: '50%',
                                                                }}
                                                            />
                                                        </p>
                                                    </div>
                                                    <div className="w3-rest">
                                                        <p
                                                            id="subcategory-anonymization"
                                                            className="w3-small"
                                                            style={{ margin: 0 }}
                                                        >
                                                            {
                                                                privacyPolicyVersions.security.anonymization[
                                                                    pointsSecurity.anonymization.toString() as keyof typeof privacyPolicyVersions.security.anonymization
                                                                ]
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="security-accountability">
                                                <div className="w3-row">
                                                    <div className="w3-col" style={{ width: '10%' }}>
                                                        <p style={{ margin: 0 }}>
                                                            <span
                                                                id="dot-accountability"
                                                                style={{
                                                                    width: '15px',
                                                                    height: '15px',
                                                                    backgroundColor: getDotColor(
                                                                        pointsSecurity.accountability
                                                                    ),
                                                                    display: 'inline-block',
                                                                    borderRadius: '50%',
                                                                }}
                                                            />
                                                        </p>
                                                    </div>
                                                    <div className="w3-rest">
                                                        <p
                                                            id="subcategory-accountability"
                                                            className="w3-small"
                                                            style={{ margin: 0 }}
                                                        >
                                                            {
                                                                privacyPolicyVersions.security.accountability[
                                                                    pointsSecurity.accountability.toString() as keyof typeof privacyPolicyVersions.security.accountability
                                                                ]
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* {loading && (
                            <div id="visual-privacy-loading-content" className="w3-container w3-center w3-text-black">
                                <div style={{ marginBottom: 10 }}>evaluating the privacy policy of the website...</div>
                                <div
                                    id="visual-privacy-loading"
                                    style={{
                                        margin: 'auto',
                                        border: '8px solid #f3f3f3',
                                        borderRadius: '50%',
                                        borderTop: '8px solid #3498db',
                                        width: 60,
                                        height: 60,
                                        animation: 'spin 2s linear infinite',
                                    }}
                                />
                            </div>
                        )} */}
                    </div>
                ) : (
                    privacyRating && (
                        <div
                            className="w3-row w3-center"
                            style={{
                                margin: 'auto',
                                width: '85%',
                                marginTop: 49,
                            }}
                            onMouseEnter={() => setShowDetails(true)}
                        >
                            <div
                                id="visual-privacy-popup"
                                className="w3-container w3-text-black w3-center w-full"
                                style={{ padding: 10 }}
                            >
                                <Image
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                    }}
                                    src={`/score_images/PrivacyRating${privacyRating}.png`}
                                    alt={`Privacy Rating `}
                                />
                            </div>
                        </div>
                    )
                )}
            </div>
        )
    );
};

export default ChromeExtensionMockup;
