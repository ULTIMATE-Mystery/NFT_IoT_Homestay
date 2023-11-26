import SDPieChart from './SDPieChart';

const SourceDistributionCard = () => {
  return (
    <div className='flex flex-col'>
        <p className='text-2xl md:text-xl'>
            Leads By Source
        </p>
        <div className='flex justify-center'>
            <SDPieChart/>
        </div>
        <div>

        </div>
    </div>
  )
}

export default SourceDistributionCard