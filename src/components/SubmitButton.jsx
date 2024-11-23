export default function SubmitButton () { 

    return( 
        <>
        {/* Submit Button */}
        <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="bg-[#393e41] font-serif text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-600"
        >
          Submit
        </button>
      </div>
        </> 
    )
}