import React from 'react'
import { Button } from 'flowbite-react'

function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center rounded-tl-3xl rounded-br-3xl'>
        <div className="flex-1 justify-center flex flex-col p-7">
            <h2 className='text-2xl'>Want to learn more DSA?</h2>
            <p className='text-gray-500 my-2'>Checkout the practice questions on our platform?</p>
            <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
                <a href="https://www.bing.com/ck/a?!&&p=e2bb902c6d8d7b9964c217b6f7e17962f830db883d1f496d96c6fdd68edf425eJmltdHM9MTcyOTY0MTYwMA&ptn=3&ver=2&hsh=4&fclid=0488132e-3d42-6736-1491-009c3c356666&psq=leetcode&u=a1aHR0cHM6Ly9sZWV0Y29kZS5jb20v&ntb=1" target='_blank' rel='noopener noreferrer'>
                    LeetCode
                </a>
            </Button>
        </div>
        <div className="p-7">
            <img src="https://leetcode.com/static/images/LeetCode_Sharing.png" />
        </div>
    </div>
  )
}

export default CallToAction