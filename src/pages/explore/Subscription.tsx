import * as React from 'react'
import BaseLayout from '../../components/layout/BaseLayout'
import SubscriptionSection from '../../components/SubscriptionSection/SubscriptionSection'
import SectionTitle from '../../components/header/SectionTitle'
import ExploreHeader from '../../components/header/ExploreHeader'

const Subscription = () => {
  return (
    <BaseLayout>
      <div>
        <ExploreHeader currentTab='Subscription' />
        <SectionTitle
          title='Subscription'
          description='Browse all popular tags.'
        />
        <SubscriptionSection />
      </div>
    </BaseLayout>
  )
}
export default Subscription
